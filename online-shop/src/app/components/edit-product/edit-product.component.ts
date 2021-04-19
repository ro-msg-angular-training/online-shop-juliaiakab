import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id = -1;
  product = {} as Product;
  errorMessage: string = '';

  formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')]],
    description: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.productService.getProduct(this.id).subscribe(
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

  submit(): void {
    this.product.name = this.formData.value.name;
    this.product.category = this.formData.value.category;
    this.product.price = this.formData.value.price;
    this.product.description = this.formData.value.description;

    this.productService.editProduct(this.id, this.product).subscribe({
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

  cancel(): void {
    this.formData.reset();
    this.router.navigate(['products/' + this.id]);
  }

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
}
