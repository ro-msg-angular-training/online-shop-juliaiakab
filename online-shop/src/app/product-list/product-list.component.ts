import { Component, OnInit } from '@angular/core';
import { headers } from '../headers';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  products = products;
  headers = headers;

  constructor() { }

  ngOnInit(): void {
  }

}
