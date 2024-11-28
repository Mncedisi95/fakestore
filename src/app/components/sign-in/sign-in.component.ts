import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

/**
* Welcome to the sign-in-component.ts file
* @author Mncedisi Masondo
* @description Component responsible for managing user authentication using the FakeStore API.
* @class SignInComponent - Handles user login functionality, form validation, error messaging, and navigation 
* upon successful authentication.
*/
export class SignInComponent {

  /**
  * @property {FormGroup} loginForm
  * Represents the reactive form for user login. Contains form controls for username and password
  * with associated validation rules.
  */
  loginForm: FormGroup;

  /**
  * Represents the current error message to display.
  * @property {string} errorMessage
  */
  errorMessage: string = ''

  /**
  * @property {boolean} isErrorVisible
  * Represents whether to display an error message on the login page. Set to true to show the 
  * error message and false to hide it.
  * Default value: false.
  */
  isErrorVisible: boolean = false;

  /**
  * @constructor
  * @description Initializes the login form and injects required services for form building, authentication, and navigation.
  * @param {FormBuilder} formBuilder - Service to help construct and manage reactive forms.
  * @param {AuthService} authService - Service for handling user authentication.
  * @param {Router} router - Service for navigation and routing.
  */
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router: Router){
    // Initialize the login form with validation rules
    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required]],  // Username field with required validation
      password: ['', [Validators.required]] // Password field with required validation
    })
  }

  /**
  * @method showError
  * @param {string} message The error message to be displayed.
  * @description Displays an error message for a specified duration.
  */
 showError(message: string): void{

  this.errorMessage = message
   // Display error message and reset the form
   this.isErrorVisible = true

   setTimeout(() => {
     this.isErrorVisible = false
   },2500)

 }

  /**
  * @method authenticate
  * @description Authenticates a user using the FakeStore API. Retrieves username and password 
  * from the login form and calls the authenticate method from the AuthService. 
  * Handles successful login and displays error messages for failed login attempts.
  */
  authenticate(){
     // Retrieve the username and password from the form controls
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    // Check if the form is invalid
    if(this.loginForm.invalid){
      this.showError('Please fill out all required fields.') // call helper method to show error message
      return
    }

    // Call the AuthService's authenticate method
    this.authService.authenticate(username,password).subscribe({
      next: (user) => {
        // Navigate to the product dashboard upon successful login
        this.router.navigate(['/index'])
      },
      error: error => {
        // Handle login error by showing an error message
        this.loginForm.reset()
        this.showError('Incorrect Password or Username.')
      }
    }) 
  }

}
