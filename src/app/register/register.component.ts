import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExistingService } from '../service/existing.service';
import { Server } from '../const/server';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public handler : string = Server.serverName + '/register';
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  emailValid = true;
  passwordValid =true ;
  confPwValid = true;
  firstNameValid = true;
  lastNameValid = true;
  birthDayValid = true;
  telValid = true;

  public regisForm : FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
    confPw: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    birthDay: new FormControl('',[Validators.required]),
    tel: new FormControl('',[Validators.required])
  });

  constructor(private service: ExistingService) { }

  ngOnInit() {
  }

  onSubmit(){
    if (this.regisForm.valid) {
      if (this.regisForm.get('password').value === this.regisForm.get('confPw').value) {
        console.log("check");
        this.service.postAPIService( this.handler, JSON.stringify(this.regisForm.value) )
        .subscribe(
          res => {
            console.log(res);
            window.location.reload();
          }, err =>{
            console.log(err);
          }
        );
      } else {
        alert("การยืนยันรหัสผ่านไม่ถูกต้อง กรุณาระบุรหัสผ่านอีกครั้ง");
        this.regisForm.patchValue({
          password : '',
          confPw: ''
        });
        this.validation();
      }
    } else{
      alert("กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง");
      this.validation();
    }
  }

  validation(){
    this.emailValid = this.regisForm.get('email').valid;
    this.passwordValid = this.regisForm.get('password').valid;
    this.confPwValid = this.regisForm.get('confPw').valid;
    this.firstNameValid = this.regisForm.get('firstName').valid;
    this.lastNameValid = this.regisForm.get('lastName').valid;
    this.birthDayValid = this.regisForm.get('birthDay').valid;
    this.telValid = this.regisForm.get('tel').valid;
  }

}
