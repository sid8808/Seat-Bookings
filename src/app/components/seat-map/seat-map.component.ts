import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatReservationService } from '../../services/seat-reservation.service';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SeatMapComponent implements OnInit {
  seats: Seat[] = [];

  constructor(private seatService: SeatReservationService) {}

  ngOnInit() {
    this.seats = this.seatService.getAllSeats();
  }

  getSeatClass(seat: Seat): string {
    return seat.isBooked ? 'booked' : 'available';
  }
}