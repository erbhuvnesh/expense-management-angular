import { createAction, props } from '@ngrx/store';

export const loadExchangeRates = createAction('[Exchange Rates] Load Exchange Rates');
export const loadExchangeRatesSuccess = createAction(
  '[Exchange Rates] Load Exchange Rates Success',
  props<{ exchangeRates: any }>()
);

export const setPreferredCurrency = createAction(
  '[User] Set Preferred Currency',
  props<{ currency: string }>()
);
