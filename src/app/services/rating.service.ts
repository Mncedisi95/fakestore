import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  /**
 * @method getStars
 * @description Generates an array representing the star rating of a product.
 *             
 * @param rate {number} - The numeric rating (between 0 and 5) to be converted into stars.
 * 
 * @returns {number[]} - An array of length 5 where:
 *                       - Each element represents a full star (1), half star (0.5), or empty star (0).
 *                       - The sum of the values will always match the input rating.
 */
  getStars(rate: number): number[] {

    const fullStars = Math.floor(rate) // Number of fully filled stars
    const halfStars = rate % 1 >= 0.5 ? 1 : 0 // Check if a half-star is needed
    const emptyStars = 5 - fullStars - halfStars // Remaining stars are empty

    // Create an array of fully filled stars, Add a half-star if applicable and fill the rest with empty stars
    return [...Array(fullStars).fill(1), ...Array(halfStars).fill(0.5), ...Array(emptyStars).fill(0)]
  }
}
