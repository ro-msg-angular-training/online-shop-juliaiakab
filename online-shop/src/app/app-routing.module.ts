import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'products', component: ProductListComponent, canActivate: [LoginGuard] },
  { path: 'products/new', component: AddProductComponent, canActivate: [LoginGuard], data: { role: 'admin' } },
  { path: 'products/:id', component: ProductDetailsComponent, canActivate: [LoginGuard] },
  {
    path: 'products/:id/edit',
    component: EditProductComponent,
    canActivate: [LoginGuard],
    data: { role: 'admin' },
  },
  { path: 'cart', component: ShoppingCartComponent, canActivate: [LoginGuard], data: { role: 'customer' } },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
