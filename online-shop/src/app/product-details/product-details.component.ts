import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-product-details]',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  
  @Input() product : {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
  };

  constructor() { 
    this.product = {id: 0, name: "", category:"", price: 0, description: ""}; 
  }

  ngOnInit(): void {
  }

}
