import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private url = environment.apiUrl + '!!!!!!!!!!/';
  
  constructor(private http: HttpClient) { }

  postSaldoFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
