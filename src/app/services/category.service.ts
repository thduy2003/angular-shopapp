
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories = `${environment.baseUrl}/categories`
  constructor(private http: HttpClient) { }
  getCategories(page: number, limit: number): Observable<Category[]> {
   const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString())
   return this.http.get<Category[]>(this.apiGetCategories, {params})
  }
}
