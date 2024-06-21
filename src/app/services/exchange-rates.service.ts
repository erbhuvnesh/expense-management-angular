import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private apiUrl = 'https://openexchangerates.org/api/latest.json';
  private apiKey = 'f4a99909d3c5403285b9270853640914'; // This api key belongs to a temporary account, would be ideally read from an environment variable, vault or database

  constructor(private http: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?app_id=${this.apiKey}`).pipe(
      map(response => response.rates)
    );
  }
}
