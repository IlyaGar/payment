import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProviderQuery } from '../models/provider-query';
import { Observable } from 'rxjs';
import { ProviderResponse } from '../models/provider-response';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  private url = environment.apiUrl + 'provider/';

  constructor(private http: HttpClient) { }

  postGetPartner(partner: ProviderQuery): Observable<ProviderResponse> {
    return this.http.post<ProviderResponse>(this.url, partner);
  }
}
