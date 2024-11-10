import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for displaying all products from fakestore api
 */

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor,CurrencyPipe],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  /**
   * Represent array of products
   * @property {any} products 
   */
  products : any[] = []

 /**
  * @constructor
  * @param productService - The Product Service
  * @param Router  - Router
  */
  constructor(private productService:ProductService,private router: Router) {}

 /**
  * @description initializes the component after angular fist display the data-bound properties
  * 
  * fetches products data from the fakestore api 
  */
    ngOnInit():void {
      // call the helper function from product service to fetch products data
      this.productService.getProducts().subscribe({
        next: (data) => {
          // initialize products property with data from products service
          this.products = data
        },
        error: (error) => {
          // print out any error might occur
          console.log(error);
        }
    })
  }

  /**
   * @method goToProductDetails
   * @description Helper function that redirect user to view product details
   * 
   * @param product 
   */
    goToProductDetails(product: any):void{
      // redirect user to view product details
      this.router.navigate(['/productdetail', product.id])
    }
  
}
