import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/interfaces/productInterface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  headers = headers;

  constructor(private http: HttpClient, private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
