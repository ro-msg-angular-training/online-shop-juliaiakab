import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  errorMessage: string = '';

  formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')]],
    description: [''],
  });

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

  get name(): AbstractControl | null {
    return this.formData.get('name');
  }

  get category(): AbstractControl | null {
    return this.formData.get('category');
  }

  get price(): AbstractControl | null {
    return this.formData.get('price');
  }

  get description(): AbstractControl | null {
    return this.formData.get('description');
  }

  cancel(): void {
    this.formData.reset();
    this.router.navigate(['/products']);
  }

  submit(): void {
    var product = {} as Product;
    product.name = this.formData.value.name;
    product.category = this.formData.value.category;
    product.price = this.formData.value.price;
    product.description = this.formData.value.description;
    product.image = '';

    this.productService.createProduct(product).subscribe({
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
