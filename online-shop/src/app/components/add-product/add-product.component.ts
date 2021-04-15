import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  product: Product = { id: -1, name: '', category: '', price: -1, description: '', image: '' };
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
    this.product.name = this.formData.value.name;
    this.product.category = this.formData.value.category;
    this.product.price = this.formData.value.price;
    this.product.description = this.formData.value.description;

    this.http.post('http://localhost:3000/products', this.product, { responseType: 'text' }).subscribe({
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
