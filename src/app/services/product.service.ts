import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * @author Mncedisi Masondo
 * 
 * @description Service Responsible for fecting all products from fakestore api
 */

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // property declaration
  private apiurl = 'https://fakestoreapi.com/products'

  /**
   * @param httpClient 
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * @description helper function that get the list of products from fakestore api
   * 
   * @returns list of products
   */
  getProducts(): Observable<any>{
    // send HTTP GET request
    return this.httpClient.get<any>(this.apiurl)
  }

  /**
   * @description Helper function that get product using product ID 
   * 
   * @param productId - Product ID
   * 
   * @returns -The product  
   */
  getProductByID(productId: number): Observable<any>{
    // Send HTTP GET request with ID
    return this.httpClient.get<any>(this.apiurl + '/' + productId)
  }

  /**
   * @description Helper function that add new product on fakestore api
   * 
   * @param product - New Product
   * 
   * @returns - new added product with new product ID 
   */
  addProduct(product:any): Observable<any>{
    // send HTTP POST request 
    return this.httpClient.post<any>(this.apiurl,product).pipe(
      // catch errors
      catchError((error:HttpErrorResponse) => {
        // throw error message
        return throwError(() => error)
      })
    )
  }

  /**
   * @description - Helper function that update requested product 
   * 
   * @param productId  - Product ID
   * @param data  - Updated Information
   * 
   * @returns updated product with the sent product ID
   */
  updateProduct(productId: number,data:any):Observable<any>{
    // Send HTTP PUT request
    return this.httpClient.put<any>(this.apiurl + '/' + productId, data)
  }

  /**
   * @description Helper function that remove product from fakestore api
   * 
   * @param productId - product ID
   * 
   * @returns deleted  product from faketore api
   */
  removeProduct(productId: number): Observable<any>{
    // Send HTTP DELETE request
    return this.httpClient.delete<any>(this.apiurl + '/' + productId)
  }

  /**
   * @method getJeweleries
   * @description helper function that get all products under juwelery category
   * @returns {products} list of products under jewelery category
   */
  getJeweleries(): Observable<any>{
    // Send HTTP GET request
     return this.httpClient.get<any>(this.apiurl + '/category/jewelery')
  }

  /**
   * @method getElectronics
   * @description helper function that list of products under electronics category
   * @returns {products} The list of products under elelctronics category
   */
  getElectronics(): Observable<any>{
    //send HTTP GET request 
    return this.httpClient.get<any>(this.apiurl + '/category/electronics')
  }

  /**
   * @method
   * @description helper function that get list of products under men's clothing category
   * @returns {products} - The list of products under men's category
   */
  getMenClothing(): Observable<any>{
    // send HTTP GET request 
    return this.httpClient.get<any>(this.apiurl + '/category/mens clothings')
  }

  /**
   * @method getWomenClothing
   * @description Helper function that get list of products under women's clothing category
   * @returns {products} The list of products under women's clothing category
   */
  getWomenClothing(): Observable<any>{
    // send HTTP GET request
    return this.httpClient.get<any>(this.apiurl + '/category/womens clothing')
  }
 
}
