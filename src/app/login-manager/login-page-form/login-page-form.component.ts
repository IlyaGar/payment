import { Component, OnInit } from '@angular/core';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.css']
})

export class LoginPageFormComponent implements OnInit {

  isLogin: boolean = false;
  nameCookie = 'user';
  isCorectLogin: boolean = true;
  expiredDate: Date;
  loginQuery = new LoginQuery("", "");
  loginResponse: LoginResponse;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.cookieService.check(this.nameCookie)){
      let fullData = this.cookieService.get(this.nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        this.isLogin = true;
        this.router.navigate(['/search']);
      }
    }
    else this.isLogin = false;
  }

  onOkClick() {
    this.loginService.getLogin(this.loginQuery).subscribe(l => {
        this.loginResponse = l; 
        this.loginUser(); 
        error => console.log(error)},
     );
  }

  loginUser() {
    if(this.loginResponse.token){
      this.isCorectLogin = true;
      this.setCookie(this.nameCookie, this.loginResponse);
      this.isLogin = true;
      this.commonService.newEvent('login');
      this.router.navigate(['/search']);
    }
    else {
      this.isCorectLogin = false;
       //alert("Неверное имя пользователи или пароль!");
    }
  }
  
  setCookie(nameCookie: string, loginResponse: LoginResponse) {
    let loginJson = JSON.stringify(loginResponse);
    this.cookieService.set(nameCookie, loginJson, 365);
  }

  onOkClickUnCorect() {
    this.isCorectLogin = true;
  }

  onNoClick() {
    this.loginQuery = new LoginQuery("", "");
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)) {
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        return loginFromCookie.token
      }
    }
    else return false;
  }
}
