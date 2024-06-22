import { createReducer, on } from '@ngrx/store';
import * as ExchangeRatesActions from '../actions/exchange-rates.actions';

export interface ExchangeRatesState {
  exchangeRates: any;
  preferredCurrency: string;
}

export const initialState: ExchangeRatesState = {
  exchangeRates: {},
  preferredCurrency: 'USD'
};

export const exchangeRatesReducer = createReducer(
  initialState,
  on(ExchangeRatesActions.loadExchangeRatesSuccess, (state, { exchangeRates }) => ({
    ...state,
    exchangeRates
  })),
  on(ExchangeRatesActions.setPreferredCurrency, (state, { currency }) => ({
    ...state,
    preferredCurrency: currency
  }))
);
