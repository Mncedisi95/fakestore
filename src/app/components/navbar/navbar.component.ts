import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

/**
 * Welcome to the navbar.component.ts File
 * @author Mncedisi Masondo
 * @class NavbarComponent
 * @description Component responsible for rendering the navigation bar, managing user interactions, 
 * and providing navigation functionality across the application.
 */
export class NavbarComponent {

  /**
  * @property {any} currentUser
  * @description Represents the currently authenticated user. 
  * This property is initialized when the user data is fetched from the AuthService.
  */
  currentUser: any;

  /**
  * @constructor
  * @description Initializes the component with required dependencies.
  * @param {AuthService} authService - Service responsible for handling authentication.
  * @param {Router} router - Angular Router for navigating between components.
  */
  constructor(private authService: AuthService, private router: Router) { }

  /**
  * @method ngOnInit
  * @description Lifecycle hook that initializes the component after Angular displays the data-bound properties. 
  * It fetches the current user data from the FakeStore API.
  */
  ngOnInit(): void {
    // Call the helper function from AuthService to get the current user
    this.authService.currentUser.subscribe(user => {
      // Initialize the currentUser property
      this.currentUser = user;
    });
  }

  /**
  * @method logout
  * @description Logs out the current user by clearing their session and navigating them to the login page.
  */
  logout(): void {
    // Call the helper function in AuthService to log out the user
    this.authService.logout();

    // Navigate to the login page/component
    this.router.navigate(['/login']);
  }

}
