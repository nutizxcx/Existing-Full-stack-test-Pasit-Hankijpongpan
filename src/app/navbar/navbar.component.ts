import { Component, OnInit, TemplateRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpenLoginModal = false;
  isOpenRegisterModal = false;
  isLogin = false;

  ngOnInit() {
    if(this.cookie.get('userAuth') != ''){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  constructor(private cookie : CookieService) {}

  openLoginModal(){
    this.isOpenLoginModal = true;
  }

  closeLoginModal(){
    this.isOpenLoginModal = false;
  }

  openRegisterModal(){
    this.isOpenRegisterModal = true;
  }

  closeRegisterModal(){
    this.isOpenRegisterModal = false;
  }

  logout(){
    this.cookie.delete('userAuth');
    window.location.reload();
  }

}

