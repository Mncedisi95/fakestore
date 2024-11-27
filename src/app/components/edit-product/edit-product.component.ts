import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for updating product to fakestore api
 */
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

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
   * Represent product title
   * @property {string} title
   */
  title : string = ''

   /**
    * represent product category
   * @property {string} category
   */
  category : string = ''

   /**
    * represent product price 
   * @property {number} price
   */
  price : number = 0

   /**
   * represent product image
   * @property {string} image
   */
  image : string = ''

   /**
   * represent product description
   * @property {string} image
   */
  description : string = ''

  /**
   * @property {boolean} isEditMode
   */
  isEditMode : boolean = false

  /**
  * @property {boolean} showSuccessMessage  - represent success message
  * @property {boolean} showErrorMessage - represent error message
  */
  showSuccessMassage : boolean = false
  showErrorMessage : boolean = false

  /**
   *@constructor
  * @param productService - represents product service
  * @param activatedRoute - represents activated route
  * @param router - represents router
  */
  constructor(private productService:ProductService,private activatedRoute:ActivatedRoute,private router:Router){}

  /**
   * @description initializes the component after angular fist display the data-bound properties
   * 
   *  Fetch product data from the fakestore api 
   * 
   */
  ngOnInit(): void {
    // Get passed product ID
    this.activatedRoute.params.subscribe(params => {
      // Initialize product id property with the passed ID
      this.productId = +params['id']
    })

    if (this.productId) {
      // set editable mode
      this.isEditMode = true

      // load the current product -- call the helper function from product service to get product using a product id
      this.productService.getProductByID(this.productId).subscribe({
        next: data => {
          // after matching product id, initialize product property
          this.product = data
          // initialize all properties
          this.title = this.product.title
          this.category = this.product.category
          this.description = this.product.description
          this.price = this.product.price
          this.image = this.product.image
        },
        error: error => {
          console.log(error)
        }
      })

    }
  }

  /**
  * @method updatetitle
  * @description helper function that update product's title
  * @param title - product title
  */
  updatetitle(title:string){
    // initialize product's title property
    this.title = title   
  }

  /**
   * @method updateCategory
   * @description helper function that update product's category
   * @param category 
   */
  updateCategory(category:string){
    // initialize product's category property
    this.category = category
  }

  /**
  * @method updatePrice
  * @description helper function that update product's description
  * @param price 
  */
  updatePrice(price: number){
    // initialize product's title property
    this.price = price
  }

  /**
  * @method updateImage
  * @description helper fuction that update product's image
  * @param image 
  */
  updateImage(image:string){
    // initialize product's title property
    this.image = image
  }

  /**
  * @method updateDescription
  * @description helper function that update product description 
  * @param description 
  */
  updateDescription(description: string){
    // initialize product's title property
    this.description = description
  }

  /**
   *@method editProduct
  * @description helper function that update product from fakestore api 
  */
  editProduct(): void {
    // update product
    const product = {
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image,
      category: this.category
    }

    if (this.isEditMode) {
      // call the helper function from product service to edit the product
      this.productService.updateProduct(this.productId, product).subscribe({
        next: data => {
          console.log(data)
          // display success message
          this.showSuccessMassage = true
          // set timeout and direct products dashboard
          setTimeout(() => {
            // navigate to index component
            this.router.navigate(['/index'])
          }, 3000)
        },
        error: error => {
          console.log(error);
          // show error message
          this.showErrorMessage = true
          // set timeout
          setTimeout(() => {
            // hide error message
            this.showErrorMessage = false
          }, 3000)
        }
      })
    }
    else {
      // navigate to add product
    }
  }

}
