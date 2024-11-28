import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeatReservationService } from '../../services/seat-reservation.service';
import { Seat } from '../../models/seat.model';
import { BookedSeatsComponent } from '../booked-seats/booked-seats.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BookedSeatsComponent, MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule]
})
export class ReservationFormComponent {
  numSeats = 1;
  bookedSeats: Seat[] = [];
  bookingError = '';

  constructor(private seatService: SeatReservationService) { }

  reserveSeats() {
    // Reset previous booking error
    this.bookingError = '';

    // Validate seat number
    if (this.numSeats < 1 || this.numSeats > 7) {
      this.bookingError = 'You can book 1-7 seats at a time.';
      return;
    }

    // Attempt to book seats
    const reservedSeats = this.seatService.bookSeats(this.numSeats);

    if (reservedSeats) {
      this.bookedSeats = reservedSeats;
    } else {
      this.bookingError = 'Unable to book requested seats. Try fewer seats or check availability.';
    }
  }
}