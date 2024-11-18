import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Welcome to cart.service.ts
 * @author Mncedisi Masondo
 * @description Service Responsible for fecting all carts from fakestore api
 */

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /**
   * @property {string} apiurl
   */
  private apiurl = 'https://fakestoreapi.com/carts'

  /**
   * @constructor
   * @param {HttpClient} httpClient 
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * @method getCarts
   * @description Helper function that get all carts from fakestore api
   * @returns {carts} - list of carts
   */
  getCarts(): Observable<any>{
    // Send HTTP GET Request
    return this.httpClient.get<any>(this.apiurl);
  }
}
