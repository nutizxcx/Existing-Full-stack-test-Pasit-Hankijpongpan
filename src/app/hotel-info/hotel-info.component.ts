import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.css']
})
export class HotelInfoComponent implements OnInit {

  protected reserveData: FormGroup = new FormGroup({
    dateIn: new FormControl('', [Validators.required]) ,
    dateOut: new FormControl('', [Validators.required]) ,
    guestAmount: new FormControl('', [Validators.required])
  });

  hotelInfoService : string = Server.serverName + "/hotelInfo";
  insertBookingData : string = Server.serverName + "/bookingData";
  hotelID;
  hotelData: any;
  zoom = 20;
  myLatLng: any;
  nfObject = new Intl.NumberFormat('en-US');
  pricePerNight;
  today = new Date();
  currentTime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  tomorrowDate = formatDate(new Date(this.today.setDate(this.today.getDate() + 1)), 'yyyy-MM-dd', 'en');
  checkinDate = this.currentDate;
  checkoutDate= this.tomorrowDate;
  maxGuestArr = [];
  totalPrice: number;
  totalPriceForDis;
  nights: number;
  bookingReqObj : any;

  constructor(private route: ActivatedRoute, private location: Location, private service: ExistingService, private cookie: CookieService, private router:Router) {
    this.hotelID = this.route.snapshot.paramMap.get('hotelID');
    // console.log(this.hotelID);
  }

  ngOnInit() {
    this.service.postAPIService(this.hotelInfoService, JSON.stringify({ 'hotelID' : this.hotelID}))
    .subscribe(
      res => {
        console.log(res);
        this.hotelData = res;
        this.myLatLng = new google.maps.LatLng({lat: this.hotelData.latitude , lng: this.hotelData.longitude});
        this.pricePerNight = this.nfObject.format(this.hotelData.pricePerNight);
        this.maxGuestForDisplay();
        this.dateDiff();
      }, err => {
        console.log(err);
      }
    );
  }


  maxGuestForDisplay(){
    for(let i =0; i < this.hotelData.maxGuest; i++){
      this.maxGuestArr[i] = i+1;
    }
  }


  dateDiff(){
    var secondDate = new Date(this.checkinDate);
    var firstDate = new Date(this.checkoutDate);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    this.nights = diffDays;
    this.totalPrice = this.nights * this.hotelData.pricePerNight;
    this.totalPriceForDis = this.nfObject.format(this.totalPrice);
}

onSubmit(){
  if(this.cookie.get('userAuth') != ''){
    if(confirm("ยืนยันการจองที่พัก?")){
    if(this.reserveData.get('guestAmount').invalid){
      this.reserveData.patchValue({
          guestAmount: 1
      });
    }

    if(this.reserveData.valid){
      this.bookingReqObj = {
        email: this.cookie.get('userAuth'),
        bookingDateAndTime: this.currentTime,
        checkinDate: this.reserveData.get('dateIn').value,
        checkoutDate: this.reserveData.get('dateOut').value,
        guestAmount: Number(this.reserveData.get('guestAmount').value),
        hotelID: Number(this.hotelID),
        totalPrice: this.totalPrice
      };

      console.log(this.bookingReqObj);
      this.service.postAPIService( this.insertBookingData, JSON.stringify(this.bookingReqObj))
      .subscribe(
        res => {
          console.log(res);
          if(res.res == "success"){
            this.router.navigate(['/bookingHistory']);
          }else {
            alert("ห้องพักวันที่ " + res.res + " เต็ม กรุณาเลือกวันอื่น");
          }
        }, err => {
          console.log(err);
        }
      );
    }
    }
  } else{
    alert('กรุณาเข้าสู่ระบบก่อน');

  }
}





}
