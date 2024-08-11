import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://localhost:8282/api/lesson';
  }

  getAll(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}/`, {withCredentials: true});
  }

  get(id: any): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.baseUrl}/${id}`, {withCredentials: true});
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, data, {withCredentials: true});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, {withCredentials: true});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: new HttpHeaders({ 'Content-Type': 'application/json'}), withCredentials: true});
  }
}
