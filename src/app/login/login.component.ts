import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private handler: string = Server.serverName + "/login";
  protected loginForm : FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  constructor(private service: ExistingService, private cookie: CookieService) { }

  isEmailValid = true ;
  isPasswordValid = true;

  ngOnInit() {
  }

  OnSubmit(){
    if(this.loginForm.valid){
      this.emailValidate();
      this.passwordValidate();
      this.service.postAPIService(this.handler, JSON.stringify(this.loginForm.value))
      .subscribe(
        res => {
          console.log(res.res);
          if(res.res == "login success"){
            this.cookie.set("userAuth", this.loginForm.get('email').value);
            window.location.reload();
          }else{
            alert("Email หรือ password ของท่านไม่ถูกต้องกรุณาลองอีกครั้งหนึ่ง");
            this.loginForm.patchValue({
              email: "",
              password: ""
            });
          }

        }, err =>{
          console.log(err);
        }
      )
    }else{
      this.emailValidate();
      this.passwordValidate();
      alert("กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง");
    }

  }

  emailValidate(){
    this.isEmailValid = this.loginForm.get('email').valid;
  }

  passwordValidate(){
    this.isPasswordValid = this.loginForm.get('password').valid;
  }

}
