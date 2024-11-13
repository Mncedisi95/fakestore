import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /**
   * represent user
   * @property {any} currentUser
   */
   currentUser : any

  /**
   * @constructor
   * @param authService
   * @param router 
   */
  constructor(private authService:AuthService,private router:Router){}

  /**
  * @description initializes the component after angular fist display the data-bound properties
  * 
  * fetches user data from the fakestore api 
  */
  ngOnInit():void {
    //call the helper function from auth service to get user
    this.authService.currentUser.subscribe(user => {
      // initialize user property
      this.currentUser = user
    })
  }

  /**
   * @method logout
   * @description helper function that logs out user 
   */
  logout():void{
    // call the helper function in auth service to logs out user
    this.authService.logout()
    // navaigate to login page/component
    this.router.navigate(['/login'])
  }

}
