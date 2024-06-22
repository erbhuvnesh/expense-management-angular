import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExchangeRatesState } from '../reducers/exchange-rates.reducer';

export const selectExchangeRatesState = createFeatureSelector<ExchangeRatesState>('exchangeRates');

export const selectExchangeRates = createSelector(
  selectExchangeRatesState,
  (state: ExchangeRatesState) => state.exchangeRates
);

export const selectPreferredCurrency = createSelector(
  selectExchangeRatesState,
  (state: ExchangeRatesState) => state.preferredCurrency
);
