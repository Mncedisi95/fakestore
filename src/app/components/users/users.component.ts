import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, MatPaginatorModule, SlicePipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

/**
 * Welcome to the users.components.ts File
 * @author Mncedisi Masondo
 * @class UsersComponent
 * @description Component responsible for fetching and displaying all users from the FakeStore API.
 * 
 * Responsibilities:
 * - Fetches user data from the FakeStore API and displays it in a paginated format.
 * - Handles pagination events to update the range of visible users.
 * - Manages properties such as the total number of users (`items`) and the current page indices (`lowIndex`, `highIndex`).
 */

export class UsersComponent {

  /**
  * @property {any[]} users
  * @description Represents the list of users fetched from the FakeStore API.
  */
  users: any[] = []

  /**
  * @property {number} items
  * @description Represents the total number of users fetched.
  */
  items: number = 0

  /**
  * @property {number} currentpage
  * @description Represents the current page index in the pagination system.
  */
  currentpage: number = 0

  /**
  * @property {number} lowIndex
  * @description Represents the starting index of the current page's visible data.
  */
  lowIndex: number = 0

  /**
  * @property {number} highIndex
  * @description Represents the ending index of the current page's visible data.
  */
  highIndex: number = 7

  /**
  * @constructor
  * @param {UserService} userService - An instance of the UserService to handle user-related operations.
  * @description Initializes the component and injects the required services for managing user data and operations.
  */
  constructor(private userService: UserService) { }

  /**
  * @method ngOnInit
  * @description Lifecycle hook that is invoked after Angular has initialized the component's data-bound properties.
  * 
  * Responsibilities:
  * - Fetches user data from the FakeStore API using the `UserService`.
  * - Initializes the users property with the retrieved data.
  * - Calculates and initializes the `items` property to reflect the total number of users.
  */
  ngOnInit(): void {
    // call the helper function from user service to fetch all users from fakestore api
    this.userService.getUsers().subscribe({
      next: (data) => {
        // initialize users property with data from user service
        this.users = data
        // Initialize items property, assuming it represents the count of users
        this.items = this.users.length
      },
      error: (error) => {
        console.log('Error Fetching users', error);
        this.items = 0
      }
    })
  }

  /**
  * @method handlePagenator
  * @description Helper function to handle pagination events and update the visible data range based on the current page and page size.
  * 
  * @param {PageEvent} event - The pagination event containing details such as the current page index and page size.
  * @returns {PageEvent} - The same pagination event for further handling or reference.
  * 
  * Functionality:
  * - Updates the lowIndex to reflect the start index of the current page.
  * - Updates the highIndex to reflect the end index of the current page.
  */
  handlePagenator(event: PageEvent): PageEvent {
    // initialize lowindex and high index property
    this.lowIndex = event.pageIndex * event.pageSize
    this.highIndex = this.lowIndex + event.pageSize
    return event
  }

}
