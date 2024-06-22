import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromExchangeRates from './store/reducers/exchange-rates.reducer';
import * as ExchangeRatesActions from './store/actions/exchange-rates.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expense-management';

  constructor(private store: Store<fromExchangeRates.ExchangeRatesState>) {}

  ngOnInit(): void {
    this.store.dispatch(ExchangeRatesActions.loadExchangeRates());
    this.store.dispatch(ExchangeRatesActions.setPreferredCurrency({ currency: 'INR' }));
  }

}
