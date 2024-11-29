import { CurrencyPipe, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor, CurrencyPipe, FormsModule, MatPaginatorModule, SlicePipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

/**
 * Welocome to the index.component.ts File
* @author Mncedisi Masondo
* @class IndexComponent
* 
* @description Component responsible for displaying and managing the list of products 
* fetched from the FakeStore API. It includes features such as product filtering, 
* category-based sorting, pagination, and navigation to product details.
*/
export class IndexComponent {

 /**
 * Represents the array of products fetched from the API.
 * @property {any[]} products - Array of product objects.
 */
  products: any[] = []

  /**
  * Represents the search input entered by the user for filtering products.
  * @property {string} search - Search keyword for filtering products.
  */
  search: string = ""

  /**
  * Represents the currently selected category for filtering products.
  * @property {string} category - Product category for filtering.
  */
  category: string = ""

  /**
   * Represents the total number of products available.
   * @property {number} items - Total count of products.
   */
  items: number = 0

  /**
   * Temporary array used for intermediate calculations or manipulation.
   * @property {any[]} arr - Auxiliary array for data processing.
   */
  arr: any[] = []

  /**
  * Represents the current page index in the pagination.
  * @property {number} currentpage - Zero-based index of the current page.
  */
  currentpage: number = 0

  /**
  * Represents the index of the first product displayed on the current page.
  * @property {number} lowIndex - Starting index for pagination.
  */
  lowIndex: number = 0

  /**
  * Represents the index of the last product displayed on the current page.
  * @property {number} highIndex - Ending index for pagination.
  */
  highIndex: number = 8

 /**
 * @constructor
 * @description Initializes the component with required dependencies.
 * @param {ProductService} productService - Service for product data and API interactions.
 * @param {Router} router - Angular Router for navigation.
 */
  constructor(private productService: ProductService, private router: Router) { }

  /**
  * @description Initializes the component after Angular first displays the data-bound properties.
  * 
  * Functionality:
  * - Fetches product data from the FakeStore API via the `ProductService`.
  * - Initializes the `products` property with the fetched data.
  * - Updates the `items` property to reflect the total number of products.
  * - Logs any errors that occur during the API call.
  */
  ngOnInit(): void {
    // Fetch product data using ProductService
    this.productService.getProducts().subscribe({
      next: (data) => {
        // Assign fetched data to the products property
        this.products = data
        // Update total product count
        this.items = this.products.length
      },
      error: (error) => {
        // Log any errors that occur during the API call
        console.log('Error fetching products:', error);
      }
    })
  }

  /**
  * @method filterCategory
  * @description Filters products by the specified category and updates the product list.
  * @param {string} category - The category to filter by. 
  * Acceptable values are:
  * - "jewelery"
  * - "electronics"
  * - "men's clothing"
  * - "women's clothing"
  * - "all categories"
  */
  fliterCategory(category: string): void {
    // Fetch products based on the selected category
    switch (category) {
      case 'jewelery':
      case 'electronics':
      case "men's clothing":
      case "women's clothing":
        this.productService.getProductsByCategory(category).subscribe(products => {
          // Update products list
          this.products = products
        })

        break;

      case "all categories":
        this.productService.getProducts().subscribe(products => {
          // Update products list
          this.products = products
        })

        break;

      default:
        console.log('Invalid category selected:', category);
        break;
    }
  }

  /**
  * @method goToProductDetails
  * @description Navigates the user to the product details page for the selected product.
  * 
  * @param {any} product - The product object containing details, including its unique identifier (id).
  */
  goToProductDetails(product: any): void {
    // Check if the product and its ID are valid
    if (!product || !product.id) {
      console.log('Invalid product: Product ID is required for navigation.');
    }
    // Redirect user to the product details page
    this.router.navigate(['/productdetail', product.id])
  }

  /**
  * @method handlePagenator
  * @description Helper function to handle pagination events and update the visible data range based on the current page and page size.
  * 
  * @param {PageEvent} event - The pagination event containing details such as the current page index and page size.
  * @returns {PageEvent} - The same pagination event for further handling or reference.
  * 
  * Functionality:
  * - Updates the lowIndex to reflect the start index of the current page.
  * - Updates the highIndex to reflect the end index of the current page.
  */
  handlePagenator(event: PageEvent): PageEvent {
    // initialize lowindex and high index property
    this.lowIndex = event.pageIndex * event.pageSize
    this.highIndex = this.lowIndex + event.pageSize
    return event
  }
}
