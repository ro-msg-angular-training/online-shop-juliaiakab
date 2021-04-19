import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interfaces/productInterface';
import { ProductService } from 'src/app/services/product.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  headers = headers;
  admin: boolean = false;

  constructor(private http: HttpClient, private loginService: LoginService, private productService: ProductService) {}

  ngOnInit() {
    this.admin = this.loginService.isAdmin();
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
