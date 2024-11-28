import { Routes } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { SeatMapComponent } from './components/seat-map/seat-map.component';

export const routes: Routes = [
  { path: 'reservation', component: ReservationFormComponent },
  { path: 'seat-map', component: SeatMapComponent },
  { path: '', redirectTo: '/reservation', pathMatch: 'full' }
];