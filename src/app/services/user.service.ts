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
   * @property dataurl - api link
   */
  private dataurl = 'https://fakestoreapi.com/users'

  /**
   * @constructor
   * @param httpClient 
   */
  constructor(private httpClient:HttpClient) { }

  /**
   * @description helper function that get all users from fakestore api
   * 
   * @returns the list of users
   */
  getUsers(): Observable<any>{
    // send HTTP GET request
    return this.httpClient.get<any>(this.dataurl)
  }

}
