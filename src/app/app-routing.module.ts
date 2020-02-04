import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListHotelComponent } from './list-hotel/list-hotel.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'hotelList', component: ListHotelComponent},
  {path: 'hotelInfo/:hotelID', component: HotelInfoComponent},
  {path: 'bookingHistory', component: BookingHistoryComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {
}
