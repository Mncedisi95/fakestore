import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  // declaration of properties
  loginForm : FormGroup
  showErrorMesage : boolean = false

  /**
   * @param formBuilder 
   */
  constructor(private formBuilder:FormBuilder, /**private authService:AuthService */){
    // Initialization of login form
    this.loginForm = this.formBuilder.group({
      //declaration of properties -- username and password
      username : ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  /**
   * @description Helper function that authenticate user from fakestore api 
   * 
   * @param username - user username
   * @param password - user password
   */
  authenticate(){
    // declaration of properties -- password and username
    const username = this.loginForm.get('username')?.value
    const password = this.loginForm.get('password')?.value

    // call the helper function from the auth service to authenticate user
      /**  this.authService.authenticate(username,password).subscribe(data => {
    }) */
  }

}
