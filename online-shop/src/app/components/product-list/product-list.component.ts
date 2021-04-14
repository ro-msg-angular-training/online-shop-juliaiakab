import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interfaces/productInterface';
import { Observable } from 'rxjs';
import { products } from 'src/app/mockup/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  headers = headers;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe((products) => {
      this.products = products;
    });
  }
}
