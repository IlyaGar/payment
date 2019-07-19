import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from 'src/app/login-manager/login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginResponse } from 'src/app/login-manager/models/login-response';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/login-manager/service/login.service';
import { LogoutStatus } from 'src/app/login-manager/models/logout-status';
import { Logout } from 'src/app/login-manager/models/logout';
import { delay } from 'q';
import { CommonService } from 'src/app/common/common.service';
import { CreateDocumComponent } from 'src/app/work-manager/create-docum/create-docum.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent implements OnInit {

  nameCookie = 'user';
  isLogin = false;
  loginResponse = new LoginResponse("", "", "", "", "", "");
  logoutStatus: LogoutStatus;

  constructor(
    public dialog: MatDialog,
    private cookieService: CookieService,
    private loginService: LoginService,
    private service: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.cookieService.check(this.nameCookie)){
      let fullData = this.cookieService.get(this.nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        this.loginResponse = loginFromCookie;
        this.isLogin = true;
      }
    }
  }

  onOpenLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      height: '340px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loginResponse = result;
        this.isLogin = true;
      }
    });
  }

  onCreateDocum(): void {
    const dialogRef = this.dialog.open(CreateDocumComponent, {
      width: '400px',
      height: '260px',
      data: {token: this.getToken(this.nameCookie), list: null},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/work', result.id]); 
      }
    });
  }

  onLogout() {
    let logout = new Logout(this.loginResponse.login, this.loginResponse.token);
    this.loginService.postLogout(logout).subscribe(
      l => { this.logoutStatus = l; this.logOut(); },
      error => console.log(error));
  }

  logOut() {
    let status = this.logoutStatus;
    if(status.status == 'true'){
      this.isLogin = false;
      this.deleteCookie(this.nameCookie);
      this.service.newEvent('logout');
    } 
    else alert("Ошибка!");
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        return loginFromCookie.token
      }
    }
    else return false;
  }

  deleteCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      this.cookieService.delete(nameCookie);
    }
  }
}
