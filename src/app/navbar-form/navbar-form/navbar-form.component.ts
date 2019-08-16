import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from 'src/app/login-manager/login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginResponse } from 'src/app/login-manager/models/login-response';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/login-manager/service/login.service';
import { LogoutStatus } from 'src/app/login-manager/models/logout-status';
import { Logout } from 'src/app/login-manager/models/logout';
import { CommonService } from 'src/app/common/common.service';
import { CreateDocumComponent } from 'src/app/work-manager/create-docum/create-docum.component';
import { Router } from '@angular/router';
import { SaldoFormComponent } from 'src/app/dialog-windows/saldo-manager/saldo-form/saldo-form.component';
import { NavbarService } from '../services/navbar.service';
import { LictDocumentsComponent } from 'src/app/dialog-windows/list-documents/lict-documents/lict-documents.component';
import { DetailPartnerFormComponent } from 'src/app/dialog-windows/detail-partner-view/detail-partner-form/detail-partner-form.component';

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

  value1: string = '';
  value2: string = '';

  constructor(
    public dialog: MatDialog,
    private navbarService: NavbarService,
    private cookieService: CookieService,
    private loginService: LoginService,
    private commonService: CommonService,
    private router: Router
  ) { 
      this.commonService.events$.forEach(event => { console.log(event); this.listenEvent(event) });
    }
  
  ngOnInit() {
    if(this.cookieService.check(this.nameCookie)){
      let fullData = this.cookieService.get(this.nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        this.loginResponse = loginFromCookie;
        this.isLogin = true;
      }
    }
    else this.isLogin = false;
  }

  listenEvent(event) {
    if(event == 'login') {
      this.ngOnInit();
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
      height: '200px',
      data: {token: this.getToken(this.nameCookie), list: null},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.redirectTo(result.id);
      }
    });
  }

  redirectTo(id: string) {
    this.router.navigateByUrl('/empty', { skipLocationChange: true }).then(()=>
      this.router.navigate(['/work', id])
    );
  }

  onOpenListDocuments(): void {
    this.router.navigate(['/mydocs']);
  }

  onOpenSaldoForm() {
    const dialogRef = this.dialog.open(SaldoFormComponent, {
      width: '600px',
      data: {token: this.getToken(this.nameCookie)},
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  postFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) {
      let file = files[0];
      let formData = new FormData(); 
      formData.append('file', file, file.name);
      console.log(formData.getAll('file'));
      this.navbarService.postSaldoFile(formData).subscribe((result) => {
        if(result) {   
          console.log(result);
          this.checkResult(result);
        }
      });
    }
  }

  checkResult(result) {
    let e = 9;
  }

  onLogOut() {
    let logout = new Logout(this.loginResponse.login, this.loginResponse.token);
    this.loginService.postLogout(logout).subscribe( response => { 
      this.logoutStatus = response; 
      this.logOut(); 
    },
      error => { 
        console.log(error); 
        alert("Сервер не отвечает.");
      });
  }

  logOut() {
    let status = this.logoutStatus;
    if(status.status == 'true') {
      this.isLogin = false;
      this.deleteCookie(this.nameCookie);
      //this.service.newEvent('logout');
      this.router.navigate(['/login']); 
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

  openDetailView(provider: string, unp: string) {
    const dialogRef = this.dialog.open(DetailPartnerFormComponent, {
      width: '1050px',
      height: '700px',
      data: {provider: provider},
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  onEnterNumber(event) {
    let inputString = event.target.value;
    this.value1 = inputString.replace(/[^0-9.]/g, '');
    let isPoint = false;
    let countDecimal = 0;
    let charArrayValueDecimal: Array<String> = [];
    let charArrayValueBeforPoint: Array<String> = [];
    let charArrayValueAfterPoint: Array<String> = [];
    let charArrayValue2: Array<String> = [];
    let charArrayValue1 = this.value1.split('');
    charArrayValue1.forEach(element => {
      if(element === '.') {
        if(!isPoint) {
          charArrayValueDecimal.push(element);
          isPoint = true;
        }
      } else {
        if(!isPoint) {
          charArrayValueDecimal.push(element);
        }
        else {
          countDecimal += 1;
          if(countDecimal <= 2)
          charArrayValueDecimal.push(element);
        }
      }
    });
    let countSep = 0;
    if(charArrayValueDecimal.find(x => x === '.')) {
      let strtemp = charArrayValueDecimal.join('').split('.');
      charArrayValueBeforPoint = strtemp[0].split('');
      charArrayValueAfterPoint = strtemp[1].split('');
    }
    else
      charArrayValueBeforPoint = charArrayValueDecimal;
    charArrayValueBeforPoint.reverse().forEach(element => {
      countSep += 1;
      switch(countSep) { 
        case 4: { 
          charArrayValue2.push(' ');
          charArrayValue2.push(element);
          break; 
        } 
        case 7: { 
          charArrayValue2.push(' ');
          charArrayValue2.push(element);
          break; 
        } 
        case 10: { 
          charArrayValue2.push(' ');
          charArrayValue2.push(element);
          break; 
        } 
        case 13: { 
          charArrayValue2.push(' ');
          charArrayValue2.push(element);
          break; 
        } 
        default: { 
          charArrayValue2.push(element);
          break; 
        } 
      } 
    });
    if(charArrayValueDecimal.find(x => x === '.'))
      this.value1 = charArrayValue2.reverse().join('') + '.' + charArrayValueAfterPoint.join('');
    else this.value1 = charArrayValue2.reverse().join('');  
    let e = 9;
  }
}
