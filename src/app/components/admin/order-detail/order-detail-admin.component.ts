import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { OrderDetail } from 'src/app/models/order-detail';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrls: ['./order-detail-admin.component.scss']
})
export class OrderDetailAdminComponent implements OnInit {
  orderResponse: OrderResponse = {
    id: 0,
    user_id: 2,
    fullname: '',
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
  orderId: number = 0;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'))

    this.orderService.getOrderById(this.orderId).subscribe({
      next:(response: any) => {
        console.log(response)
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
  saveOrder() {
   this.orderService.updateOrder(this.orderId, new OrderDTO(this.orderResponse))
   .subscribe({

    next:(response: any) => {
      debugger
      console.log('Order updated successfully', response)
      alert('Order updated successfully')
      this.router.navigate(['../'], {relativeTo: this.route})
    },
    complete: () => {
      debugger
    },
    error: (err: any) => {
      console.error('Error', err)
    }
   })
  }
}
