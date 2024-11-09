import { CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for displaying single product details from fakestore api
 */

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf,CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  
   // declaration of properties
   product : any | undefined
   productId : number = 0
   showSuccessMessage : boolean = false; showFailedMessage : boolean = false
 
   /**
    * @param activatedRoute 
    * @param productService 
    */
   constructor(private router: Router,private activatedRoute:ActivatedRoute,private productService:ProductService){}
 
     /**
   * @description initializes the component after angular fist display the data-bound properties
   * 
   * Fetch product data from the fakestore api 
   */
  ngOnInit(): void{
    //Get Passed product id
    this.activatedRoute.params.subscribe(params => {
      // Initialize product id property with the passed ID
      this.productId = +params['id']
    })

    // call the helper function from the service to get product using a product id
    this.productService.getProductByID(this.productId).subscribe({
      next: (data) => {
        // after matching, initialize product property
        this.product = data  
      },
      error: (error) => {
        //print out any error might occur
        console.log(error);
      }
    })
  }
  
   /**
   * @description Helper function that redirects user to edit product component
   */
   editProduct():void{
    this.router.navigate(['/editproduct', this.productId])
  }

   /**
   *@description Helper function that remove product from fakestore api 
  */
 removeProduct():void{
  // call the helper function from product service to remove product from fakestore api
  this.productService.removeProduct(this.productId).subscribe({
    next: response => {
      console.log(response);
      
       // show success message
      this.showSuccessMessage = true
      // set timeout to navigate to products component after product has been removed successfully 
      setTimeout(() => {
        // navigate to products component
        this.router.navigate(['/products'])
      },2000)
    },
    error: error => {
      console.log(error);

      // show error message
      this.showFailedMessage = true
      // set timeout to display error message 
      setTimeout(() => {
        // hide error message
        this.showFailedMessage = false
      },1500)
    }
  }) 
 }


}
