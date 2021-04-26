import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/productInterface';
import { AddProduct } from 'src/app/store/actions/product.actions';
import { AppState } from 'src/app/store/state/app.state';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store<AppState>) {}

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

    this.store.dispatch(new AddProduct(product));
  }
}
