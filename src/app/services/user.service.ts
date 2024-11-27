import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'node:console';
import { catchError, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

/**
 *  Welcome to the user.service.ts file.
 * @author Mncedisi Masondo
 * @description Service responsible for fetching all users from the FakeStore API.
 * @class Provides methods to fetch user data from the API.
 */
export class UserService {

   /**
   * The FakeStore API endpoint for fetching users.
   * @property {string} apiUrl
   */
   private apiUrl = 'https://fakestoreapi.com/users';

  /**
  * @constructor
  * @description Initializes the UserService with the HttpClient service to make HTTP requests.
  * @param {HttpClient} httpClient - The HttpClient service used to send requests to the API.
  */
  constructor(private httpClient: HttpClient) { }

  /**
   * @method getUsers
   * @description Fetches a list of users from the FakeStore API.
   * @returns {Observable<any>} - An observable that emits an array of users fetched from the API.
   */
  getUsers(): Observable<any>{
    // Send HTTP GET request to fetch users from the API
    return this.httpClient.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.log('Error fetching users:',error);
        // Return an empty array in case of error
        return of([]);
      })
    )
  }
}
