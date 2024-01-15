import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { AuthGuardFn } from './guards/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardFn } from './guards/admin.guard';

const routes: Routes = [
 {
   path: '',
   component: HomeComponent
 },
 {
  path: 'login',
  component: LoginComponent
 },
 {
  path: 'register',
  component: RegisterComponent
 },
 {
  path: 'products/:id',
  component: DetailProductComponent
 },
 {
  path: 'orders',
  component: OrderComponent,
  canActivate: [AuthGuardFn]
 },
 {
  path: 'orders/:id',
  component: OrderDetailComponent,
  canActivate: [AuthGuardFn]
 },
 {
  path: 'user-profile',
  component: UserProfileComponent,
  canActivate: [AuthGuardFn]
 }, {
  path: 'admin',
  component: AdminComponent,
  canActivate: [AdminGuardFn]
 }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], })

export class AppRoutingModule {}
