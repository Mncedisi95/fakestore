import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for updating product to fakestore api
 */

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  /**
   * Represents a form group
   * @property {formGroup} productForm 
   */
  productForm : FormGroup 

  /**
   * Represents a product in fakestore api
   * @property {any} product  
   */
  product : any  | undefined

  /**
   * The product's ID
   * @property {number} productId 
   */
  productId : number = 0


  /**
   *@constructor
  * @param formBuilder - represents form builder
  * @param productService - represents product service
  * @param activatedRoute - represents activated route
  */
  constructor(private formBuilder: FormBuilder,private productService:ProductService,private activatedRoute:ActivatedRoute){
    // Initialization of product form
    this.productForm = this.formBuilder.group({
      //declaration of properties
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['',[Validators.required]],
      image: ['', Validators.required],
      description: ['', [Validators.required]]
    })
  }

  /**
   * @description initializes the component after angular fist display the data-bound properties
   * 
   *  Fetch product data from the fakestore api 
   * 
   */
  ngOnInit():void{
    // Get passed product ID
    this.activatedRoute.params.subscribe(params => {
      // Initialize product id property with the passed ID
      this.productId = +params['productId']
    })

    // load the current product -- call the helper function from product service to get product using a product id
    this.productService.getProductByID(this.productId).subscribe({
      next: data => {
        // after matching product id, initialize product property
        this.product = data
      },
      error : error =>{
        console.log(error)
      }
    })

  }

  /**
   *@method editProduct
  * @description helper function that update product from fakestore api 
  */
  editProduct(): void {
    // update product
    const product = {
      title: this.productForm.get('title')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
      image: this.productForm.get('image')?.value,
      category: this.productForm.get('category')?.value
    }
    // call the helper function from product service to edit the product
    this.productService.updateProduct(this.productId, product).subscribe({
      next: data => {
        console.log(data)
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
