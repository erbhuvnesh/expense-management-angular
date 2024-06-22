import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ExchangeRatesService } from '../../services/exchange-rates.service';
import * as ExchangeRatesActions from '../actions/exchange-rates.actions';

@Injectable()
export class ExchangeRatesEffects {
  loadExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExchangeRatesActions.loadExchangeRates),
      mergeMap(() =>
        this.exchangeRatesService.getExchangeRates().pipe(
          map(exchangeRates => ExchangeRatesActions.loadExchangeRatesSuccess({ exchangeRates })),
          catchError(() => of({ type: '[Exchange Rates] Load Exchange Rates Failure' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private exchangeRatesService: ExchangeRatesService
  ) {}
}
