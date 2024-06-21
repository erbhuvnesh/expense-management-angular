import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:3000/expenses';
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getExpenses(userId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getExpenseTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/expenseTypes`);
  }

  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/currencies`);
  }
}
