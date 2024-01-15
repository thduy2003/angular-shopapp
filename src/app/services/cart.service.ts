import { ProductService } from 'src/app/services/product.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Map<number,number> = new Map();
  constructor(private productService: ProductService) {
    //Lấy dữ liệu giỏ hàng từ localStorage khi khởi tạo service
    const storedCart = localStorage.getItem('cart');
    if(storedCart) {
      this.cart = new Map(JSON.parse(storedCart))
    }
    // {
    //   "2": 5,
    //   "3": 10
    // }
   }
  addToCart(productId: number, quantity: number = 1): void {
    if(this.cart.has(productId)) {
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    } else {
      this.cart.set(productId, quantity);
    }
    // sau khi thay đổi giỏ hàng, lưu nó vào localStorage

  this.saveCartToLocalStorage();
  }
  getCart(): Map<number,number> {
    return this.cart;
  }
  clearCart(): void {
    localStorage.removeItem('cart');
  }
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())))
  }
}
