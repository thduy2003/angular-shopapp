import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { Order } from 'src/app/models/order';
import { OrderDetail } from 'src/app/models/order-detail';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderResponse: Order = {
    id: 0,
    user_id: 2,
    full_name: '',
    email: '',
    phone_number: '',
    order_date: new Date(),
    address: '',
    note: '',
    total_money: 0,
    shipping_date: new Date(),
    status: '',
    payment_method: 'cod',
    shipping_method: 'express',
    order_details: []
  }

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
   const orderId = 13;
   this.orderService.getOrderById(orderId).subscribe({
    next:(response: any) => {

      this.orderResponse = {
        ...this.orderResponse,
        ...response,
        order_details: response.order_details.map((order_detail: OrderDetail) => {
          order_detail.product.thumbnail = `${environment.baseUrl}/products/images/${order_detail.product.thumbnail}`
          return order_detail
        })
      }

    },
    complete: () => {

    },
    error: (err: any) => {
      console.log('Cannot fetching order data', err)
    }
   })
  }

}
