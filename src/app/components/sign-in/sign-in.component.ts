import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for authenticating user from fakestore api
 */

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  /**
   * represent login form
   * @property {FormGroup} loginForm 
   */
  loginForm : FormGroup

  /**
   * represent error message
   * @property {boolean} showErrorMesage 
   */
  showErrorMesage : boolean = false

  /**
   * @constructor
   * @param formBuilder
   * @param authService 
   */
  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router: Router){
    // Initialization of login form
    this.loginForm = this.formBuilder.group({
      //declaration of properties -- username and password
      username : ['', [Validators.required]], // validates username
      password: ['', [Validators.required]] // validates password
    })
  }

  /**
   * @method authenticate
   * @description Helper function that authenticate user from fakestore api 
   * 
   * @param username - the user's username
   * @param password - the user's password
   */
  authenticate(){
    // declaration of properties -- password and username
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    // call the helper function from the auth service to authenticate user
    this.authService.authenticate(username,password).subscribe({
      next: user => {
        // navigate to product dashboard
        this.router.navigate(['/index'])
      },
      error: error => {
        // show error message
        this.showErrorMesage = true
        // time out error message
        setTimeout(() =>{
          // hide error 
          this.showErrorMesage = false;
        },3000)
      }
    }) 
  }

}
