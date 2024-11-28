import { Injectable } from '@angular/core';
import { Seat } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatReservationService {
  private totalRows = 11;  // 10 full rows + 1 partial row
  private seatsPerFullRow = 7;
  private lastRowSeats = 3;
  private seats: Seat[] = [];

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats(): void {
    let seatId = 1;
    for (let row = 1; row <= this.totalRows; row++) {
      const seatsInThisRow = row === this.totalRows ? this.lastRowSeats : this.seatsPerFullRow;
      
      for (let seatNum = 1; seatNum <= seatsInThisRow; seatNum++) {
        this.seats.push({
          id: seatId,
          rowNumber: row,
          seatNumber: seatNum,
          isBooked: false
        });
        seatId++;
      }
    }
  }

  getAllSeats(): Seat[] {
    return this.seats;
  }

  bookSeats(numSeats: number): Seat[] | null {
    // First try to book in a single row
    const singleRowBooking = this.bookSeatsInSingleRow(numSeats);
    if (singleRowBooking) return singleRowBooking;

    // If single row booking fails, try to find nearby seats
    return this.bookNearbySeats(numSeats);
  }

  private bookSeatsInSingleRow(numSeats: number): Seat[] | null {
    for (let row = 1; row <= this.totalRows; row++) {
      const rowSeats = this.seats.filter(seat => seat.rowNumber === row);
      const availableSeats = rowSeats.filter(seat => !seat.isBooked);

      if (availableSeats.length >= numSeats) {
        const selectedSeats = availableSeats.slice(0, numSeats);
        selectedSeats.forEach(seat => seat.isBooked = true);
        return selectedSeats;
      }
    }
    return null;
  }

  private bookNearbySeats(numSeats: number): Seat[] | null {
    const availableSeats = this.seats.filter(seat => !seat.isBooked);

    if (availableSeats.length < numSeats) {
      return null;  // Not enough seats available
    }

    // Sort available seats by their ID to find nearby seats
    const sortedAvailable = availableSeats.sort((a, b) => a.id - b.id);
    const selectedSeats = sortedAvailable.slice(0, numSeats);
    
    selectedSeats.forEach(seat => seat.isBooked = true);
    return selectedSeats;
  }

  resetSeats(): void {
    this.seats.forEach(seat => seat.isBooked = false);
  }
}