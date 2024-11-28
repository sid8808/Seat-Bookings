import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatReservationComponent } from './components/reservation-form/seat-reservation.component'; 

const routes: Routes = [
  { path: '', component: SeatReservationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }