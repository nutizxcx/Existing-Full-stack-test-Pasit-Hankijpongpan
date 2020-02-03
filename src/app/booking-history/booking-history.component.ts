import { Component, OnInit } from '@angular/core';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  private getBookingHistoryData = Server.serverName + '/bookingHistory';

  constructor(private service: ExistingService, private cookie: CookieService) { }

  bookingHistData;
  nfObject = new Intl.NumberFormat('en-US');

  ngOnInit() {
    this.service.postAPIService(this.getBookingHistoryData, JSON.stringify({ email : this.cookie.get('userAuth')}))
    .subscribe(
      res => {
        console.log(res);
        this.bookingHistData = res;
        this.pricePerNightThousandSeperator();
      }, err => {
        console.log(err);
      }
    )
  }

  pricePerNightThousandSeperator() {
    for( let i =0; i< this.bookingHistData.length ;i++){
      this.bookingHistData[i].totalPrice = this.nfObject.format(this.bookingHistData[i].totalPrice);
    }
}

}
