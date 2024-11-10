import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @author Mncedisi Masondo
 * 
 * @description Service Responsible for Fecting all users from fakestore api
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Represent fakestore api link
   * @property dataurl 
   */
  private dataurl = 'https://fakestoreapi.com/users'

  /**
   * @constructor
   * @param httpClient 
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * @method getUsers
   * @description helper function that get all users from fakestore api
   * @returns {users} - The list of users
   */
  getUsers(): Observable<any>{
    // send HTTP GET request
    return this.httpClient.get<any>(this.dataurl)
  }

}
