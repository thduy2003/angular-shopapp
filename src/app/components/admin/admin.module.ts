import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order-admin/order-admin.component';
import { OrderDetailAdminComponent } from './order-detail/order-detail-admin.component';
import { ProductAdminComponent } from './product/product-admin.component';
import { CategoryAdminComponent } from './category/category-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminComponent,
    OrderDetailAdminComponent,
    ProductAdminComponent,
    CategoryAdminComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ]
})

export class AdminModule {}
