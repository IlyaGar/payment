import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginQuery } from '../models/login-query';
import { LoginResponse } from '../models/login-response';
import { Logout } from '../models/logout';
import { LogoutStatus } from '../models/logout-status';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private url = "http://192.168.1.38:8080/opcode=1&param=";
  //private urlget = "http://192.168.1.38/auth/?data=";
  private urlLogin = environment.apiUrl + "auth/?data";
  private urlLogout = environment.apiUrl + "logout/";

  constructor(private http: HttpClient) { }
  
  getLogin(login: LoginQuery): Observable<LoginResponse> {
    login = new LoginQuery("Sauko_i", "ыфглщ86");
    /*const params = new HttpParams().set('login', login.login).set('password', login.password);
    const options = {params: params};
    return this.http.get<LoginResponse>(`${this.url}`, options);*/

    //let loginJson = JSON.stringify(login);
    //return this.http.get<LoginResponse>(this.urlget + loginJson);

    //return this.http.post<LoginResponse>(`${this.url}`, login);

    return this.http.post<LoginResponse>(`${this.urlLogin}`, login);
  }

  postLogout(login: Logout): Observable<LogoutStatus> {
    return this.http.post<LogoutStatus>(`${this.urlLogout}`, login);
  }
}
