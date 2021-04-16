import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id: number = -1;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  errorMessage: string = '';

  formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')]],
    description: [''],
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.http.get<Product>('http://localhost:3000/products/' + this.id).subscribe(
      (product: Product) => {
        this.product = product;
        this.formData.patchValue({
          name: this.product.name,
          category: this.product.category,
          price: this.product.price,
          description: this.product.description,
        });
      },
      (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      }
    );
  }

  submit() {
    this.product.name = this.formData.value.name;
    this.product.category = this.formData.value.category;
    this.product.price = this.formData.value.price;
    this.product.description = this.formData.value.description;

    this.http.put('http://localhost:3000/products/' + this.id, this.product, { responseType: 'text' }).subscribe({
      next: () => {
        console.log('Product updated successfully!');
        window.alert('The product has been updated successfully');
        this.router.navigate(['products/' + this.id]);
      },
      error: (error) => {
        this.errorMessage = this.errorHandlerService.handleError(error);
      },
    });
  }

  cancel() {
    this.formData.reset();
    this.router.navigate(['products/' + this.id]);
  }

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
}
