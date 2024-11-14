import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

/**
 * @author Mncedisi Masondo
 * 
 * @description Component Responsible for displaying all users from fakestore api
 * 
 */

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor,MatPaginatorModule,SlicePipe],
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
   * represents number of users
   * @property {number} items
   */
  items : number = 0

  /**
  * represents page items
   * @property {number} currentpage
   */
  currentpage : number = 0

  /**
   * @property {number} low - represent low index of a page
   * @property {number} high - represent high index of a page
   */
  lowIndex : number = 0
  highIndex : number = 7 

  /**
  * @constructor
  * @param userService 
  */
  constructor(private userService:UserService){}
  
  /**
  * @description initializes the component after angular fist display the data-bound properties
  * Fetches user data from the fakestore api 
  */
  ngOnInit(): void{
    // call the helper function from user service to fetch all users from fakestore api
    this.userService.getUsers().subscribe(data => {
       // initialize users property with data from user service
       this.users = data     
       // initialize items property
       this.items = this.users.length
    })

  }

  /**
  * @method handlePagenator
  * @description helper function that change page event
  * @param event 
  * @returns page event
  */
  handlePagenator(event: PageEvent): PageEvent {
    // initialize lowindex and high index property
    this.lowIndex = event.pageIndex * event.pageSize
    this.highIndex = this.lowIndex + event.pageSize
    return event
  }

}
