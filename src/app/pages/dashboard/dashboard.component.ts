import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as fromExchangeRates from '../../store/reducers/exchange-rates.reducer';
import * as ExchangeRatesSelectors from '../../store/selectors/exchange-rates.selectors';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  expenses: Expense[] = [];
  userId: number = 1; // Assuming logged-in user ID is 1 for this example
  displayedColumns: string[] = ['type', 'name', 'date', 'amount', 'currency', 'actions'];
  dataSource: MatTableDataSource<Expense>;
  expenseCategories: string[] = [];
  topExpenditure: { category: string; amount: number; };
  exchangeRates$: Observable<any>;
  preferredCurrency$: Observable<string>;
  exchangeRates: any;
  preferredCurrency: string;

  constructor(private expenseService: ExpenseService, public dialog: MatDialog, private store: Store<fromExchangeRates.ExchangeRatesState>) {
    this.dataSource = new MatTableDataSource(this.expenses);
    this.exchangeRates$ = this.store.select(ExchangeRatesSelectors.selectExchangeRates);
    this.preferredCurrency$ = this.store.select(ExchangeRatesSelectors.selectPreferredCurrency);
   }

  ngOnInit(): void {
    this.loadExpenses();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    combineLatest([this.exchangeRates$, this.preferredCurrency$]).subscribe(([rates, currency]) => {
      this.exchangeRates = rates;
      this.preferredCurrency = currency;
    });
  }

  loadExpenses(): void {
    this.expenseService.getExpenses(this.userId).subscribe((data: Expense[]) => {
      this.expenses = data;
      this.dataSource.data = this.expenses;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.topExpenditure = this.getTopExpenditureByCategory();
    });

    this.expenseService.getExpenseTypes().subscribe(expenses=>{
      this.expenseCategories = expenses;
    });
  }

  addExpense(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { expense: { userId: this.userId } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.addExpense(result).subscribe(() => {
          this.loadExpenses();
        });
      }
    });
  }

  editExpense(expense: Expense): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      minWidth: '250px',
      width: '40vw',
      data: { expense: { ...expense } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.updateExpense(result).subscribe(() => {
          this.loadExpenses();
        });
      }
    });
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => {
      this.loadExpenses();
    });
  }

  convertToPreferredCurrency(amount: number, currency: string): number {
    if (!this.exchangeRates || !this.preferredCurrency) {
      return amount;
    }
    const rate = this.exchangeRates[currency];
    const preferredRate = this.exchangeRates[this.preferredCurrency];
    return (amount / rate) * preferredRate;
  }

  getTotalExpenditure(): number {
    return this.expenses.reduce((total, expense) => {
      const convertedAmount = this.convertToPreferredCurrency(expense.amount, expense.currency);
      return total + convertedAmount;
    }, 0);
  }

  getAverageExpenseByCategory(category: string): number {
    const categoryExpenses = this.expenses.filter(expense => expense.type === category);
    const total = categoryExpenses.reduce((sum, expense) => {
      const convertedAmount = this.convertToPreferredCurrency(expense.amount, expense.currency);
      return sum + convertedAmount;
    }, 0);
    return categoryExpenses.length ? total / categoryExpenses.length : 0;
  }

  getTopExpenditureByCategory(): { category: string, amount: number } {
    const categoryTotals: { [category: string]: number } = {};

    this.expenses.forEach(expense => {
      const convertedAmount = this.convertToPreferredCurrency(expense.amount, expense.currency);
      if (categoryTotals[expense.type]) {
        categoryTotals[expense.type] += convertedAmount;
      } else {
        categoryTotals[expense.type] = convertedAmount;
      }
    });

    let topCategory = '';
    let highestAmount = 0;

    for (const category in categoryTotals) {
      if (categoryTotals[category] > highestAmount) {
        highestAmount = categoryTotals[category];
        topCategory = category;
      }
    }

    return { category: topCategory, amount: highestAmount };
  }

}

