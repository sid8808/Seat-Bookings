import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-booked-seats',
  templateUrl: './booked-seats.component.html',
  styleUrls: ['./booked-seats.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class BookedSeatsComponent {
  @Input() bookedSeats: Seat[] = [];
}