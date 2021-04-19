import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/productInterface';

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product = {} as Product;

  constructor() {}
}
