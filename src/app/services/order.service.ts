import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { OrderResponse } from '../responses/order/order.response';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiOrder = `${environment.baseUrl}/orders`;
  private apiGetAllOrders = `${environment.baseUrl}/orders/get-orders-by-keyword`
  private apiConfig = {
    headers: this.createHeaders()
  }
  constructor( private http: HttpClient) { }
  private createHeaders(): HttpHeaders {
   return new HttpHeaders({
    'Content-Type': 'application/json',
  })
  }
  placeOrder(orderDTO: OrderDTO): Observable<any>{

    return this.http.post(this.apiOrder, orderDTO, this.apiConfig)
  }
  getOrderById(orderId: number): Observable<any>{
    return this.http.get(`${this.apiOrder}/${orderId}`)
  }
  getAllOrders(keyword: string, page: number, limit: number): Observable<OrderResponse[]>{
    const params = new HttpParams().set('keyword', keyword).set('page', page.toString()).set('limit', limit.toString())
    return this.http.get<any>(this.apiGetAllOrders, {params})
  }
  updateOrder(orderId: number, orderData: OrderDTO): Observable<any> {
    const url = `${environment.baseUrl}/orders/${orderId}`
    return this.http.put(url, orderData)
  }
  deleteOrder(orderId: number): Observable<any> {
    const url = `${environment.baseUrl}/orders/${orderId}`
    return this.http.delete(url, {responseType: 'text'})
  }

}
