import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for displaying all users from fakestore api
 * 
 */

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

 /**
  * represents users
 * @property {any} users
 */
  users : any[] = []

  /**
  * @constructor
  * @param userService 
  */
  constructor(private userService:UserService){}
  
  /**
  * @description initializes the component after angular fist display the data-bound properties
  * Fetches products data from the fakestore api 
  */
  ngOnInit(): void{
    // call the helper function from user service to fetch all users from fakestore api
    this.userService.getUsers().subscribe(data => {
       // initialize users property with data from user service
       this.users = data     
    })

  }

}
