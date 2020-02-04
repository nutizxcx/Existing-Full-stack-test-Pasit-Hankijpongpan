
import { Component, OnInit } from '@angular/core';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { formatDate } from '@angular/common';
import { timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.css']
})
export class ListHotelComponent implements OnInit {

  constructor(private service: ExistingService, private router: Router) { }

  loadDataService: string = Server.serverName + "/provinceAndDistrict";
  hotelListService: string = Server.serverName + "/hotelList";
  pvAndDt : any;
  selectedPv: string;
  selectedDt: string;
  dtChoice: any;
  today = new Date();
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  tomorrowDate = formatDate(new Date(this.today.setDate(this.today.getDate() + 1)), 'yyyy-MM-dd', 'en');
  hotelListReqData: any;
  hotelListData: any;
  checkinDate = this.currentDate;
  checkoutDate = this.tomorrowDate;
  searchBox: string;
  nfObject = new Intl.NumberFormat('en-US');



  ngOnInit() {
    this.service.getAPIService(this.loadDataService)
    .subscribe(
      res => {
        this.pvAndDt = res;
        this.selectedPv = Object.keys(this.pvAndDt)[0];
        this.dtChoice = this.pvAndDt[this.selectedPv];
        this.selectedDt = this.dtChoice[0];
        this.getData();
      }, err => {
        console.log(err);
      }
    );
  }

  selectDt() {
    this.dtChoice = this.pvAndDt[this.selectedPv];
    this.selectedDt = this.dtChoice[0];
    this.getData();
  }

  getData() {
    this.hotelListReqData =  {
      province: this.selectedPv,
      district: this.selectedDt,
      checkin_date: this.checkinDate,
      checkout_date: this.checkoutDate
    }
    this.service.postAPIService(this.hotelListService, JSON.stringify(this.hotelListReqData))
        .subscribe(
          res => {
            console.log(res);
            this.hotelListData = res;
            this.pricePerNightThousandSeperator();
          }, err => {
            console.log(err);
          }
        );
  }

  pricePerNightThousandSeperator() {
      for( let i =0; i< this.hotelListData.length ;i++){
        this.hotelListData[i].pricePerNight = this.nfObject.format(this.hotelListData[i].pricePerNight);
      }
  }

  hotelSelect(hotelID) {

    this.router.navigate(['/hotelInfo',hotelID]);
  }

}
