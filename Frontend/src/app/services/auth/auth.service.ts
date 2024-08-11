import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userDetails: { username: string; password: string }): Observable<User> {
    return this.http.post<User>('https://localhost:8282/api/login', userDetails, {withCredentials: true}).pipe(
      map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
      })
    );
  }

  logout(): void {
    this.http.post<any>('https://localhost:8282/api/logout', {}, {withCredentials: true}).subscribe({
      next: () => {
        localStorage.clear();
      },
      complete: () => {
        this.router.navigateByUrl("/login");
      },
    });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {
    let user = localStorage.getItem('currentUser');
    if (user === null) {
      return null
    }

    return JSON.parse(user);
  }
}
