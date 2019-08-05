import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetDetail } from '../models/get-detail';

@Injectable({
  providedIn: 'root'
})
export class DetailPartnerService {

  private url = environment.apiUrl + 'detail/';
  
  constructor(private http: HttpClient) { }

  postGetDatail(data: GetDetail): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
