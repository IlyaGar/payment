import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from 'src/app/login-manager/login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginResponse } from 'src/app/login-manager/models/login-response';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent implements OnInit {

  nameCookie = 'user';
  isLogin = false;
  loginFromCookie: string;
  loginResponse = new LoginResponse("", "", "", "", "", "");
  
  constructor(public dialog: MatDialog,
    private cookieService: CookieService) { }

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

  onOpenLoginDialog(id: number): void {
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

  onLogout() {
    this.isLogin = false;
    this.deleteCookie(this.nameCookie);
  }

  deleteCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      this.cookieService.delete(nameCookie);
    }
  }
}
