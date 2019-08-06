import { Component, OnInit } from '@angular/core';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CommonService } from 'src/app/common/common.service';
import { AttentionFormComponent } from 'src/app/dialog-windows/dialog-attention/attention-form/attention-form.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
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
    this.loginService.getLogin(this.loginQuery).subscribe(response => {
      this.checkResponse(response) 
    },
        error => console.log(error)
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

  checkResponse(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status);
        }
        else {
          this.loginResponse = response; 
          this.loginUser(); 
        }
      }
      else {
        this.loginResponse = response; 
        this.loginUser(); 
      }
    }
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
