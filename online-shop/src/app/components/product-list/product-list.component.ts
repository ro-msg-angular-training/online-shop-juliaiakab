import { Component, OnInit } from '@angular/core';
import { headers } from '../../mockup/headers';
import { products } from '../../mockup/products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products = products;
  headers = headers;

  constructor() {}

  ngOnInit(): void {}
}
