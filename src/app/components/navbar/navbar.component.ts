import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /**
   * @constructor
   * @param authService 
   */
  constructor(private authService:AuthService){}

  /**
   * @method logout
   * @description helper function that logs out user 
   */
  logout():void{
    // call the helper function in auth service to logs out user
    this.authService.logout().subscribe()

  }

}
