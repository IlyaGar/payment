import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private url = environment.apiUrl + 'balancerecon/';
  
  constructor(private http: HttpClient) { }

  postGetDocument(doc: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:63572/api/docs', doc);
  }

  postSaldoFile(data: FormData): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
