import { CurrencyPipe, NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for displaying all products from fakestore api
 */

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgFor,CurrencyPipe,FormsModule,MatPaginatorModule,SlicePipe],
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
   * @property {string} search
   */
  search : string = ""

  /**
   * @property {string} category
   */
  category : string = ""

  /**
   * represents number of products
   * @property {number} items
   */
  items : number = 0

  arr: any[] = []

  /**
  * represents page items
   * @property {number} currentpage
   */
  currentpage : number = 0

  /**
   * @property {number} low - represent low index of a page
   * @property {number} high - represent high index of a page
   */
  lowIndex : number = 0
  highIndex : number = 8 


 /**
  * @constructor
  * @param productService - The Product Service
  * @param Router  - Router
  * @param formBuilder - form builder
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

          this.items = this.products.length
        },
        error: (error) => {
          // print out any error might occur
          console.log(error);
        }
    })
  }

  /**
  * @method fliterCategory
  * @description helper function that fliter all categories
  * @param category 
  */
  fliterCategory(category:string):void{
    // check what category has been selected and display those categories
    if(category === "jewelery"){
      // call the helper function from product service to fetch all jeweleries
      this.productService.getJeweleries().subscribe(jeweleries => {
        // initialize products property
        this.products = jeweleries   
      })
    }
    else if(category === 'electronics'){
      // call the helper function from product service to fetch all electronics
      this.productService.getElectronics().subscribe(electronics => {
         // initialize products property
         this.products = electronics
      })
    }
    else if(category === "men's clothing"){
      // call the helper function from product service to fetch all men's clothing
      this.productService.getMenClothing().subscribe(mensclothing => {
        // initialize products property
        this.products = mensclothing
      })
    }
    else if(category === "women's clothing"){
      // call the helper function from the product service to fetch all women's clothing
      this.productService.getWomenClothing().subscribe(womenclothing => {
        // initialize products property
        this.products = womenclothing
      })
    }
    else if(category === "all categories"){
      // call the helper function from the product service to fetch all products
      this.productService.getProducts().subscribe(data => {
        // initialize products property 
        this.products = data
      })
    }
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
    
    /**
     * @method handlePagenator
     * @param event 
     * @returns 
     */
    handlePagenator(event:PageEvent): PageEvent{

      this.lowIndex = event.pageIndex * event.pageSize
      this.highIndex = this.lowIndex + event.pageSize
      return event
    }
}
