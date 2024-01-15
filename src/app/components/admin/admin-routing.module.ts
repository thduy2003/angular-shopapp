import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrderAdminComponent } from './order/order-admin/order-admin.component';
import { OrderDetailAdminComponent } from './order-detail/order-detail-admin.component';
import { ProductAdminComponent } from './product/product-admin.component';
import { CategoryAdminComponent } from './category/category-admin.component';



const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'orders',
        component: OrderAdminComponent
      }, {
        path: 'orders/:id',
        component: OrderDetailAdminComponent
      },
      {
        path: 'products',
        component: ProductAdminComponent
      },
      {
        path: 'categories',
        component: CategoryAdminComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], })

export class AdminRoutingModule {}
