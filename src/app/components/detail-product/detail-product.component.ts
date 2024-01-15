import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  constructor(private productService: ProductService, private cartService: CartService ,private route: ActivatedRoute) { }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id')
    if(idParam !== null) {
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)) {

      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
           // Lấy danh sách sản phẩm và thay đổi url
          if(response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {

              product_image.image_url =  product_image.image_url !== null ? `${environment.baseUrl}/products/images/${product_image.image_url}` : ''
            })
          }

          this.product = response
          this.showImage(0)
        },
        complete: () => {

        },
        error: (error: any) => {

        }
      })
    }
  }
  showImage(index: number) {
    if(this.product && this.product.product_images && this.product.product_images.length >0) {
      if(index < 0) {
        index = this.product?.product_images?.length - 1;
      } else if(index >= this.product?.product_images?.length) {
        index = 0;
      }
    }
    this.currentImageIndex = index;
  }

  thumbnailClick(index: number) {
    this.currentImageIndex = index;
  }
  nextImage(): void {
    this.showImage(this.currentImageIndex + 1);

  }
  previousImage(): void {
    this.showImage(this.currentImageIndex - 1)
  }
  addToCart(): void {
    if(this.product) {
      debugger
      this.cartService.addToCart(this.productId, this.quantity)
    } else {
      console.error("Không thể thêm sản phẩm vào giỏ hàng vì product là null");
    }
  }
  increaseQuantity(): void {
    this.quantity++;
  }
  decreaseQuantity(): void {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }
}
