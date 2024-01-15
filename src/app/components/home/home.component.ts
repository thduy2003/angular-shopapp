import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategoryId: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = '';

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts(this.keyword, this.selectedCategoryId
      ,this.currentPage, this.itemsPerPage)
      this.getCategories(1,100)
  }
  getCategories(page:number, limit: number) {
   this.categoryService.getCategories(page,limit).subscribe({
    next:(categories: Category[]) => {
       this.categories = categories
    },
    complete: () => {


    },
    error: (error: any) => {
      console.error("Error fetching categories", error)
    }
   })
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId,page,limit).subscribe({
      next: (response: any) => {

        response.products.forEach((product: Product)  => {
          product.url = product.thumbnail !== null ?`${environment.baseUrl}/products/images/${product.thumbnail}` : 'https://hondaotosgquan7.vn/wp-content/themes/gv-automotive/images/default.jpg'
        })
        this.products = response.products
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {

      },
      error: (error: any) => {
        console.error("Error fetching products", error)
      }
    })
  }

  searchProducts() {
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.getProducts(this.keyword, this.selectedCategoryId,this.currentPage,  this.itemsPerPage)
  }
  onPageChange(page: number) {
    this.currentPage = page
    this.getProducts(this.keyword, this.selectedCategoryId,this.currentPage,  this.itemsPerPage)
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages/2);
    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    if(endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1 , 1);
    }
    return new Array(endPage - startPage + 1).fill(0).map((_,index) => startPage + index);
  }
  onProductClick(productId: number) {
    this.router.navigate(['/products/' + productId])
  }

}
