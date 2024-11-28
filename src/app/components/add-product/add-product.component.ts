import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

/**
 * Welcome to the add-product.component.ts File
 * @author Mncedisi Masondo
 * @description Component responsible for managing the functionality of adding new products to the FakeStore API.
 * @class AddProductComponent
 * 
 * This component provides:
 * - A reactive form for capturing product details.
 * - Validation for required fields (title, category, price, image, and description).
 * - Integration with the ProductService to send a new product to the API.
 * - User feedback with success or error messages.
 */
export class AddProductComponent {

  /**
   * Represents the reactive form for product. Contains form controls with associated validation rules.
   * @property {FormGroup} productForm 
   */
  productForm : FormGroup

  /**
  * Represents the current success message to display.
  * @property {string} successMessage
  */
  successMessage: string = ''

 /**
 * Represents the current error message to display.
 * @property {string} errorMessage
 */
 errorMessage: string = ''

 /**
 * Controls visibility of success messages.
 * @property {boolean} showSuccessMessage
 */
 showSuccessMessage: boolean = false

 /**
 * Controls visibility of error messages.
 * @property {boolean} showErrorMessage
 */
 showErrorMessage: boolean = false;

  /**
  * @constructor
  * @description Initializes the product form and injects required services for form handling and product management.
  * @param {FormBuilder} formBuilder - Service for building and managing reactive forms.
  * @param {ProductService} productService - Service for handling product-related API operations.
  */
  constructor(private formBuilder: FormBuilder,private productService:ProductService){
    // Initialize the product form with validation rules
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required]],  // Title field with required validation
      category: ['', [Validators.required]], // Category field with required validation
      price: ['',[Validators.required]], // Price field with required validation
      image: ['', Validators.required], // Image field with required validation
      description: ['', [Validators.required]] // Description field with required validation
    })
  }

  /**
  * @method showError
  * @param {string} message The error message to be displayed.
  * @description Displays an error message for a specified duration.
  */
 showError(message: string): void{

  this.errorMessage = message
   // Display error message and reset the form
   this.showErrorMessage = true

   setTimeout(() => {
     this.showErrorMessage = false
   },2500)

 }

  /**
  * @method showSuccess
  * @param {string} message - The success message to be displayed.
  * @description Displays a success message for a specified duration. 
  */
  showSuccess(message: string){

    this.successMessage = message
     // Display success message and reset the form
     this.showSuccessMessage = true

     setTimeout(() => {
       this.showSuccessMessage = false
     }, 2500);

  }

  /**
  * @method addProduct
  * @description Submits a new product to the FakeStore API using the provided form data.
  * Handles success and error responses with appropriate user feedback and form reset functionality.
  */
  addProduct():  void{
    // Create a new product object using form values
    const newProduct = {
      title: this.productForm.get('title')?.value,
      price: this.productForm.get('price')?.value,
      description: this.productForm.get('description')?.value,
      image: this.productForm.get('image')?.value,
      category: this.productForm.get('category')?.value
    }

    // Check if the form is invalid
    if(this.productForm.invalid){
      this.showError('Please fill out all required fields.') // call helper method to show error message
      return
    }

    // Call the Product Service to add the product
    this.productService.addProduct(newProduct).subscribe({
      next: response => {
        console.log('Product added Sucessfully!', response);
        
        this.productForm.reset()
        this.showSuccess('Product added successfully!') // call helper method to show success message
      },
      error: error => {
        console.log('Failed to add product:', error);

        this.productForm.reset()
        this.showError('Failed to add product. Please try again.') // call helper method to show error message
      }
    })
  }

}
