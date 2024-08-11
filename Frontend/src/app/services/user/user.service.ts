import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:8282/api';
  }

  getAllTeachers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/teachers`, {withCredentials: true});
  }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/students`, {withCredentials: true});
  }
}
