import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for adding new product to fakestore api
 */

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  /**
   * Represent product form
   * @property {FormGroup} productForm 
   */
  productForm : FormGroup

  /**
   * @property {boolean}  showSuccessMessage - represent success message
   * @property {boolean} showErrorMessage  - represent error message
   */
  showSuccessMessage: boolean = false; showErrorMessage : boolean = false

  /**
  * @constructor
  * @param formBuilder
  * @param productService 
  */
  constructor(private formBuilder: FormBuilder,private productService:ProductService){
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
   * @method addProduct 
   * @description Helper function that add new product to fakestore api
   */
  addProduct(){
    // create new product
    const newProduct = {
      title: this.productForm.get('title')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
      image: this.productForm.get('image')?.value,
      category: this.productForm.get('category')?.value
    }

    // call the helper function from fakestore api to add new product
    this.productService.addProduct(newProduct).subscribe({
      next: response => {
        // print out message in the user, setout time
        console.log(response);
        
        setTimeout(() => {
          // reset form 
          this.productForm.reset()
          // display message
          this.showSuccessMessage = true
          // timeout error message
          setTimeout(() => {
            // hide message
            this.showSuccessMessage = false

          }, 2500)
        }, 1500);
         
      },
      error: error => {
        // display error message
        setTimeout(() => {
          // reset form
          this.productForm.reset()
          // show error message
          this.showErrorMessage = true
          // hide message
          setTimeout(() => {
            this.showErrorMessage = false
          },2500)
        },1500)
      }
    })
  }


}
