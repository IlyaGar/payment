import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetContract } from '../models/order-query';
import { ResponseContract } from '../models/response-contract';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = environment.apiUrl + 'contract/';

  constructor(private http: HttpClient) { }

  postGetPartner(partner: GetContract): Observable<ResponseContract> {
    return this.http.post<ResponseContract>(this.url, partner);
  }
}
