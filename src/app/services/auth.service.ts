import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

/**
 * @author Mncedisi Masondo
 * @class AuthService
 * @description Service Responsible for authenticating users from fakestore api
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Represents fakestore api link
   * @property {string} authurl 
   */
  private authurl = 'https://fakestoreapi.com/auth/login'

  /**
   * Represents user subject
   * @property {any} currentUserSubject
   */
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser())

  /**
   *@constructor
  * @param httpClient 
  * @param platformId
  */
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  /**
  * @method authenticate
  * @description Helper function that authenticate user from the fakestore api
  * @param username  - The user's username
  * @param password - The user's password
  * @returns {userdata} - current user logged in
  */
  authenticate(username: string, password: any): Observable<any> {
    // Send HTTP POST Request
    return this.httpClient.post(this.authurl, { username, password }).pipe(
      map(userdata => {
        // set the current user
        this.setCurrentUser(userdata)
        return userdata
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('login failed', error);
        return throwError(() => error)
      })
    )

  }

  /**
   * @method getCurrentUser
   * @description helper function that get the user that is log in
   * @returns {user} The current user
   */
  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      // declare user
      const storedUser = localStorage.getItem('currentUser')
      // return user
      return storedUser ? JSON.parse(storedUser) : null
    }
    return null;

  }

/**
 * @method setCurrentUser
 * @description Helper function that set the current user
 * @param user - The user
 */
  setCurrentUser(user: any): any {
    if (isPlatformBrowser(this.platformId)) {
      // set current to local storage
      localStorage.setItem('currentUser', JSON.stringify(user))
    }
  }

  /**
   * @method currentUser
   * @description helper function that get current user subject
   * @returns {BehaviorSubject} - The current user subject
   */
   get currentUser(): Observable<any>{
    // return the current user subject
   return this.currentUserSubject.asObservable();
 }

  /**
   * @method isLoggedIn
   * @description helper function that checks if a user is logged in.
   * @returns {boolean} True if a user is logged in, false otherwise
   */
  isLoggedIn():boolean{
    // return current user
    return this.getCurrentUser() != null
  }

 /**
  * @method logout
  * @description Helper function that logout the current user
  */
  logout():any {
    if(isPlatformBrowser(this.platformId)){
      // remove the current user
      localStorage.removeItem('currentUser')
    }
    // set current user subject to null
    this.currentUserSubject.next(null)
  }

}
