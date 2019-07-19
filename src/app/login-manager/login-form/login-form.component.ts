import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/common/common.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  nameCookie = 'user';
  isCorectLogin: boolean = true;
  expiredDate: Date;
  loginQuery = new LoginQuery("", "");
  loginResponse: LoginResponse;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginQuery,
    private service: CommonService
  ) { }

  ngOnInit() {
  }

  onOkClick() {
    this.loginService.getLogin(this.loginQuery).subscribe(
      l => {this.loginResponse = l; this.loginUser();},
      error => console.log(error));
  }

  closeDialogOk(data): void {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClickUnCorect() {
    this.isCorectLogin = true;
  }

  setCookie(nameCookie: string, loginResponse: LoginResponse) {
    let loginJson = JSON.stringify(loginResponse);
    this.cookieService.set(nameCookie, loginJson, 365);
  }

  getCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      let token = this.cookieService.get(nameCookie);
    }
  }

  loginUser() {
    if(this.loginResponse.token){
      this.isCorectLogin = true;
      this.setCookie(this.nameCookie, this.loginResponse);
      //this.getCookie(this.nameCookie);
      this.closeDialogOk(this.loginResponse);
      this.service.newEvent('login');
    }
    else {
      this.isCorectLogin = false;
       //alert("Неверное имя пользователи или пароль!");
    }
  }
}
