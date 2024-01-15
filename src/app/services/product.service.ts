import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProducts = `${environment.baseUrl}/products`

  constructor(private http: HttpClient) { }
  getProducts(keyword: string, categoryId: number,
    page: number, limit: number): Observable<Product[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    .set('keyword', keyword)
    .set('category_id', categoryId)
    return this.http.get<Product[]>(this.apiGetProducts, {params})
  }
  getDetailProduct(productId: number) {
    return this.http.get(`${environment.baseUrl}/products/${productId}`)
  }
  getProductsByIds(productIds: number[]): Observable<Product[]> {
    const params = new HttpParams().set('ids', productIds.join(','));
    return this.http.get<Product[]>(`${this.apiGetProducts}/by-ids`, {params})
  }
}
