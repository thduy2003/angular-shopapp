import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup
  cartItems: {product: Product, quantity: number}[] = [];
  couponCode: string = '';
  totalAmount: number = 0;
  orderData:OrderDTO = {
    user_id: 2,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cod',
    shipping_method: 'express',
    coupon_code: '',

    cart_items: []
  }
  constructor(private cartService: CartService, private productService: ProductService,
     private orderService: OrderService, private fb: FormBuilder,
     private tokenService: TokenService, private router: Router
     ) {
      this.orderForm = this.fb.group({
        fullname: ['Nguyen Van Ôrder', [Validators.required]],
        email: ['nvorder@gmail.com', [Validators.email]],
        phone_number: ['0889555345',[Validators.required, Validators.minLength(6)]],
        address: ['phường a ngõ c', [Validators.required, Validators.minLength(5)]],
        note: ['dễ vỡ xin nhẹ tay'],
        shipping_method: ['express'],
        payment_method: ['cod'],
      })
     }

  ngOnInit(): void {
    this.orderData.user_id = this.tokenService.getUserId();
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());

    if(productIds.length === 0) {
      return;
    }
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {
        this.cartItems = productIds.map((productId) => {
          const product = products.find(p => p.id === productId);

          if(product) {
            product.thumbnail = `${environment.baseUrl}/products/images/${product.thumbnail}`
          }
          return {
            product: product!,
            quantity: cart.get(productId)!
          }
        })

      },
      complete: () => {
        this.calculateTotal()
      },
      error:(error: any) => {
        console.error("error fetching data", error)
      }
    })
  }
  placeOrder() {
    if(this.orderForm.valid) {
      // gán giá trị từ form vào đối tượng orderData
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      }
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        quantity: cartItem.quantity,
        product_id: cartItem.product.id
      }))
      this.orderData.total_money = this.totalAmount
      this.orderService.placeOrder(this.orderData).subscribe({
        next: (response) => {
          alert('Đặt hàng thành công')
          this.cartService.clearCart();
          this.router.navigate(['/'])
        },
        complete: ()  => {
          this.calculateTotal();
        },
        error:(error: any) => {
          console.log('Lỗi khi đặt hàng', error)
        }
      })
    } else {
      alert('Dữ liệu không hợp lệ, vui lòng kiểm tra lại')
    }
  }
  calculateTotal():void {
    this.totalAmount = this.cartItems.reduce(
      (total,item) => total + item.product.price * item.quantity, 0
    )
  }

}
