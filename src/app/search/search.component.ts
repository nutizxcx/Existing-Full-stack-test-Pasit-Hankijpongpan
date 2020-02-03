import { Component, OnInit } from '@angular/core';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchContent : string;
  searchService : string = Server.serverName + '/search';
  searchResp: any;
  nfObject = new Intl.NumberFormat('en-US');
  x;

  constructor(private service: ExistingService, private router: Router) { }

  ngOnInit() {
  }

  pricePerNightThousandSeperator() {
    for( let i =0; i< this.searchResp.length ;i++){
      this.searchResp[i].pricePerNight = this.nfObject.format(this.searchResp[i].pricePerNight);
    }
  }

  selectHotel(hotelID){
    this.x = '/hotelInfo/' + hotelID;

  }

  searchSuggest(){
    console.log(this.searchContent);
    if(this.searchContent != ''){
    this.service.postAPIService(this.searchService, JSON.stringify({"searchString":this.searchContent}))
    .subscribe(
      res => {
        console.log(res);
        this.searchResp = res;
        this.pricePerNightThousandSeperator();
      }, err => {
        console.log(err);
      }
    );
    }else {
      this.searchResp = null ;
    }
  }



}
