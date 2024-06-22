// src/app/pages/expense-dialog/expense-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {
  expenseTypes: string[] = [];
  currencies: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { expense: Expense },
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.loadExpenseTypes();
    this.loadCurrencies();
  }

  loadExpenseTypes(): void {
    this.expenseService.getExpenseTypes().subscribe(types => {
      this.expenseTypes = types;
    });
  }

  loadCurrencies(): void {
    this.expenseService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }

  onSaveExpense(): void {
    this.dialogRef.close(this.data.expense);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
