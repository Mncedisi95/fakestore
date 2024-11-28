import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

/**
 * Welcome to the auth.service.ts file
 * @author Mncedisi Masondo
 * @description This service ensures secure authentication and manages session state. 
 * @class Provides methods for login, logout, and user session management.
 */
export class AuthService {

  /**
  * The base URL for the FakeStore API's authentication endpoint.
  * @property {string} apiUrl -  Used for sending login requests.
  */
  private apiUrl = 'https://fakestoreapi.com/auth/login'

  /**
  * @property {BehaviorSubject<any>} currentUserSubject
  * @description A BehaviorSubject that holds the current user's data.
  * Initialized with the user's data retrieved from local storage or a default value.
  * This allows components to subscribe to user state changes in real-time.
  */
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser())

  /**
  * @constructor
  * @description Initializes the AuthService with necessary dependencies.
  * @param {HttpClient} httpClient - Angular's HTTP client for making API requests.
  * @param {object} platformId - Token that identifies the platform (e.g., browser or server).
  * Injected using Angular's PLATFORM_ID token for platform-specific operations.
  */
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  /**
  * @method authenticate
  * @description Authenticates a user using the FakeStore API. Sends the user's credentials
  * (username and password) via a POST request. Upon successful authentication, the user data is
  * stored locally and the current user subject is updated.
  * @param {string} username - The user's username.
  * @param {string} password - The user's password.
  * @returns {Observable<any>} An observable containing the authenticated user's data.
  */
  authenticate(username: string, password: string): Observable<any> {
    // Send HTTP POST request with username and password
    return this.httpClient.post(this.apiUrl, { username, password }).pipe(
      map(userdata => {
        // Save the authenticated user's data
        this.setCurrentUser(userdata)
        // Notify subscribers about the updated user
        this.currentUserSubject.next(userdata)
        // Return the authenticated user's data
        return userdata
      }),
      catchError((error: HttpErrorResponse) => {
        //re-throw the error for further handling
        console.log('login failed', error);
        return throwError(() => error)
      })
    )

  }

  /**
  * @method getCurrentUser
  * @description Retrieves the currently logged-in user from local storage.
  * Ensures that this functionality is only executed in a browser environment.
  * @returns {any | null} The current user object if found, otherwise `null`.
  */
  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve the user data from local storage
      const storedUser = localStorage.getItem('currentUser')
      // Parse and return the user object if it exists, otherwise return null
      return storedUser ? JSON.parse(storedUser) : null
    }
    // Return null for non-browser environments
    return null;

  }

  /**
  * @method setCurrentUser
  * @description Sets the current user's data in local storage for browser environments.
  * Also updates the currentUserSubject to notify subscribers of the user change.
  * @param {any} user - The user object to be stored.
  * If null is passed, the user data will be cleared from local storage.
  */
  setCurrentUser(user: any): any {

    if (isPlatformBrowser(this.platformId)) {

      if(user){
      // Store the current user in local storage as a JSON string
      localStorage.setItem('currentUser', JSON.stringify(user))
      }
      else {
      // Remove the current user if null is provided
      localStorage.removeItem('currentUser')
      }
    }

    // Update the current user subject
    this.currentUserSubject.next(user)
  }

  /**
  * @method currentUser
  * @description Provides an observable of the current user's state.
  * Components or services can subscribe to this observable to react to changes in the current user's data.
  * @returns {Observable<any>} An observable of the current user subject.
  */
   get currentUser(): Observable<any>{
    // Return the current user subject as an observable
    return this.currentUserSubject.asObservable();
 }

  /**
  * @method isLoggedIn
  * @description Checks whether a user is currently logged in by verifying if a valid user object exists.
  * @returns {boolean} True if a user is logged in (i.e., a current user object exists), otherwise false.
  */
  isLoggedIn():boolean{
    // Return true if a current user object exists, otherwise false
    return this.getCurrentUser() !== null
  }

  /**
   * @method logout
   * @description Logs out the current user by clearing their session data.
   * If running in a browser environment, it removes the current user's data from local storage.
   * Also resets the current user subject to `null` to notify subscribers.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Remove the current user's data from local storage
      localStorage.removeItem('currentUser');
    }
    // Reset the current user subject to null
    this.currentUserSubject.next(null);
  }

}
