import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { LoginService } from '../service/login.service';
import { delay } from 'q';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  isLogin: boolean = false;
  cn: string;
  loginQuery = new LoginQuery("", "");
  loginResponse = new LoginResponse("", "", "", "", "", "");

  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginQuery) { }

  ngOnInit() {

  }

  async onOkClick() {
    this.loginService.getLogin(this.loginQuery).subscribe(l => this.loginResponse = l);
    await delay(250);
    if(this.loginResponse){
      this.isLogin = true;
      this.createStorage();
      this.onNoClick(this.loginResponse);
    }
    else alert("Неверное имя пользователи или пароль!");

  }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  createStorage(){
    localStorage.setItem('currentUser', JSON.stringify({ token: this.loginResponse.token, name: this.loginResponse.login }));
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var token = currentUser.token; // your token
  }
}
