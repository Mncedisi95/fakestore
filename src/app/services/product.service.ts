import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { catchError, Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

/**
 * Welcome to the product.service.ts file.
 * @author Mncedisi Masondo
 * @description Service responsible for fetching all products from the FakeStore API.
 * @class Provides methods to interact with the FakeStore API to retrieve product data.
 */
export class ProductService {

  /**
   * Represents the API URL for fetching products.
   * @property {string} apiUrl - The URL of the FakeStore API.
   */
  private apiUrl = 'https://fakestoreapi.com/products'

  /**
   * @constructor
   * @description Initializes the service with the HttpClient for making HTTP requests.
   * @param {HttpClient} httpClient - The HttpClient service used to send requests to the API.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * @method getProducts
   * @description Fetches the list of products from the FakeStore API.
   * @returns {Observable<any>} An observable that emits a list of products.
   */
  getProducts(): Observable<any> {
    // Send HTTP GET request to fetch the list of products from the API
    return this.httpClient.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.log('Error fetching products:', error)
        // Return an empty array in case of error
        return of([])
      })
    )
  }

  /**
  * @method getProductByID
  * @description Fetches a product by its ID from the FakeStore API.
  * @param {number} productId - The ID of the product to retrieve.
  * @returns {Observable<any>} An observable that emits the product with the given ID.
  */
  getProductByID(productId: number): Observable<any> {
    // Send HTTP GET request to fetch the product by ID
    return this.httpClient.get<any>(this.apiUrl + '/' + productId).pipe(
      catchError(error => {
        console.log('Error fetching product:', error);
        // Fallback value in case of error
        return of(null);
      })
    )
  }

  /**
  * @method addProduct
  * @description Sends a new product to the FakeStore API and returns the added product with its ID.
  * @param {Product} product - The new product to add. Must include title, price, description, image and category.
  * @returns {Observable<any>} An observable emitting the newly added product, including its generated ID.
  * @throws {Error} If the request fails.
  */
  addProduct(product: any): Observable<any> {
    // send HTTP POST request to add a new product to the fakestore API 
    return this.httpClient.post<any>(this.apiUrl, product).pipe(
      // Handle errors
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Error adding product: ${error.message}`;
        // throw error message        
        return throwError(() => new Error(errorMessage))
      })
    )
  }

  /**
   * @method updateProduct
   * @description  Update a product's information.
   * @param {number} productId - The ID of the product to update.
   * @param {data<any>} data - The fields to update for the product.
   * @returns {Observable<any>} An observable emitting the updated product.
   * @throws {Error} If the request fails.
   */
  updateProduct(productId: number, data: any): Observable<any> {
    // Send HTTP PUT request to update a product by its ID in the fakestore API
    return this.httpClient.put<any>(this.apiUrl + '/' + productId, data).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Error updating product with ID ${productId}: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  /**
   * @method removeProduct
   * @description delete a product.
   * @param {number} productId - The ID of the product to delete.
   * @returns {Observable<any>} An observable emitting the deleted product.
   * @throws {Error} If the request fails.
   */
  removeProduct(productId: number): Observable<any> {
    // Send HTTP DELETE request to remove a product by its ID from the Fakestore API
    return this.httpClient.delete<any>(this.apiUrl + '/' + productId).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = `Error removing product with ID ${productId}: ${error.message}`;
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  /**
   * @method getProductsByCategory
   * @description Fetches all products under a specific category.
   * @param {string} category - The category of products to fetch.
   * @returns {Observable<any>} An observable emitting the list of products in the specified category.
   * @throws {HttpErrorResponse} If the HTTP request fails.
   */
  getProductsByCategory(category: string): Observable<any> {
    // Send HTTP GET request to fetch all products under a specific category
    return this.httpClient.get<any>(this.apiUrl + '/category/' + category).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(`Error fetching products in category "${category}":`, error.message);
        return throwError(() => new Error(`Failed to fetch products in category "${category}"`));
      })
    )
  }
}
