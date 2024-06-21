import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  getUser(userID: string|number): Observable<User> {
    return this.http.get<User>(this.apiUrl+userID);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl+user.id, user);
  }
}
