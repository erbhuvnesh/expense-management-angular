import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExchangeRatesService } from '../../services/exchange-rates.service';
import * as fromExchangeRates from '../../store/reducers/exchange-rates.reducer';
import * as ExchangeRatesSelectors from '../../store/selectors/exchange-rates.selectors';
import * as ExchangeRatesActions from '../../store/actions/exchange-rates.actions';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  displayedColumns: string[] = ['currency', 'rate'];
  dataSource = new MatTableDataSource<any>();
  preferredCurrency$: Observable<string>;
  preferredCurrency: string;
  exchangeRates$: Observable<any>;
  editMode = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store<fromExchangeRates.ExchangeRatesState>) {
    this.preferredCurrency$ = this.store.select(ExchangeRatesSelectors.selectPreferredCurrency);
    this.exchangeRates$ = this.store.select(ExchangeRatesSelectors.selectExchangeRates);
   }

  ngOnInit(): void {
    this.store.dispatch(ExchangeRatesActions.loadExchangeRates());
    this.exchangeRates$.subscribe(rates => {
      this.dataSource.data = Object.entries(rates).map(([key, value]) => ({ currency: key, rate: value }));
      this.dataSource.paginator = this.paginator;
    });

    this.preferredCurrency$.subscribe(currency => {
      this.preferredCurrency = currency;
    });
  }


  setPreferredCurrency(currency: string): void {
    this.store.dispatch(ExchangeRatesActions.setPreferredCurrency({ currency }));
    this.toggleEditMode();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
