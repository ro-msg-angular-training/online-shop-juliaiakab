import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/interfaces/productInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { EditProduct } from 'src/app/store/actions/product.actions';
import { selectProduct } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id = -1;
  product = {} as Product;
  image = '';
  errorMessage: string = '';

  formData: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', [Validators.required, Validators.pattern('[0-9]+(.[0-9][0-9]?)?')]],
    description: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.store.select(selectProduct).subscribe(
      (product: Product) => {
        this.product = product;
        this.image = product.image;
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
    const edited = {} as Product;
    edited.id = this.id;
    edited.name = this.formData.value.name;
    edited.category = this.formData.value.category;
    edited.price = this.formData.value.price;
    edited.image = this.image;
    edited.description = this.formData.value.description;
    this.store.dispatch(new EditProduct(this.id, edited));
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
