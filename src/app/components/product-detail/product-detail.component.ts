import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { RatingService } from '../../services/rating.service';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, NgFor ,CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

/**
 * @author Mncedisi Masondo
 * @class ProductDetailComponent
 * 
 * @description
 * This component is responsible for fetching and displaying the details of a single product from the Fakestore API.
 * It retrieves product data using the product ID, and shows detailed information like the product's title, price, 
 * description, image, and category. It also includes functionality for handling any errors that may arise 
 * during the data-fetching process.
 */
export class ProductDetailComponent {

  /**
  * @description Represents the product fetched from the Fakestore API.
  * @property {any} product - The product data, possibly undefined initially.
  */
  product: any | undefined

  /**
   * @description Represents the unique identifier for the product.
   * @property {number} productId - The ID of the product.
   */
  productId: number = 0

  /**
   * @description Represents flags for showing messages based on the product operation outcome.
   * @property {boolean} showSuccessMessage - Indicates if the success message should be displayed.
   * @property {boolean} showFailedMessage - Indicates if the error message should be displayed.
   */
  showSuccessMessage: boolean = false
  showFailedMessage: boolean = false

  /**
  * @constructor
  * @description Initializes the component by injecting necessary services for routing, retrieving route parameters, and interacting with the product service.
  * @param {Router} router - Service for navigation between components.
  * @param {ActivatedRoute} activatedRoute - Service for accessing route-specific parameters and data.
  * @param {ProductService} productService - Service for performing operations on products.
  * @param {RatingService} ratingService - Service for performing ratings of products
  */
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService,private ratingService: RatingService) { }

  /**
   * @description Initializes the component after Angular displays data-bound properties.
   * Fetches product data from the FakeStore API based on the route parameter.
   */
  ngOnInit(): void {
    // Get the product ID from the route parameter
    this.activatedRoute.params.subscribe({
      next: (params) => {
        // Initialize product id property with the passed ID
        this.productId = +params['id']

        if (isNaN(this.productId) || this.productId <= 0) {
          console.log('Invalid product ID');
          return;
        }

        // load product
        this.loadProduct()

      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  /**
   * @method loadProduct
   * @description fetch product details by ID
   */
  loadProduct(): void {
    //  Calls the ProductService to fetch product details by ID
    this.productService.getProductByID(this.productId).subscribe({
      next: (data) => {
        // After successful response, initialize the product property
        this.product = data
      },
      error: (error) => {
        //Handle errors
        console.log(error);
      }
    })
  }

  /**
   * @method editProduct
   * @description Navigates to the edit product component/page with the current product ID.
   * @throws {Error} If the product ID is invalid or undefined.
   */
  editProduct(): void {
    // Check if the product and its ID are valid
    if (!this.product || !this.product.id) {
      console.log('Invalid product: Product ID is required for navigation.');
    }
    // navigate to edit product component/page
    this.router.navigate(['/editproduct', this.product.id])
  }

  /**
  * @method removeProduct
  * @description Removes a product from the FakeStore API and handles success and error scenarios.
  */
  removeProduct(): void {
    // call the helper function from product service to remove product from fakestore api
    this.productService.removeProduct(this.productId).subscribe({
      next: response => {
        console.log(response);
        // show success message
        this.showSuccessMessage = true
        // set timeout to navigate to products component after product has been removed successfully 
        setTimeout(() => {
          // navigate to products component
          this.router.navigate(['/index'])
        }, 3000)
      },
      error: error => {
        console.log(error);
        // show error message
        this.showFailedMessage = true
        // set timeout to display error message 
        setTimeout(() => {
          // hide error message
          this.showFailedMessage = false
        }, 3000)
      }
    })
  }

  /**
   * @method getStars
   * @description Generates an array representing a star rating.
   * @param {number} rate - The numeric rating (between 0 and 5).
   * @returns {number[]} - An array of star representations (1 for full, 0.5 for half, 0 for empty).
   */
  getStars(rate: number): number[] {
    // call the helper function in the rating service.
    return this.ratingService.getStars(rate)
  }

}
