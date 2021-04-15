import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/productInterface';

@Component({
  selector: '[app-product-item]',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = { id: -1, category: '', price: 0, name: '', description: '', image: '' };

  constructor() {}

  ngOnInit(): void {}
}
