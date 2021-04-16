import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  errorMessage: string = '';
  formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')]],
    description: [''],
  });

  get name() {
    return this.formData.get('name');
  }

  get category() {
    return this.formData.get('category');
  }

  get price() {
    return this.formData.get('price');
  }

  get description() {
    return this.formData.get('description');
  }

  cancel() {
    this.formData.reset();
    this.router.navigate(['/products']);
  }

  submit() {
    var product = <Product>{};
    product.name = this.formData.value.name;
    product.category = this.formData.value.category;
    product.price = this.formData.value.price;
    product.description = this.formData.value.description;
    product.image = '';

    this.http.post('http://localhost:3000/products', product, { responseType: 'text' }).subscribe({
      next: () => {
        console.log('Product added successfully!');
        window.alert('The product has been added successfully');
        this.router.navigate(['products']);
      },
      error: (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      },
    });
  }
}
