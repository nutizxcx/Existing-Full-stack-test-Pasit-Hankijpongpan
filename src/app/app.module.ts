import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ListHotelComponent } from './list-hotel/list-hotel.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ExistingService } from '../app/service/existing.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SearchComponent } from './search/search.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ListHotelComponent,
    HotelInfoComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    BookingHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ExistingService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
