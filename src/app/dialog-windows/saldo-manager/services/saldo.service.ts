import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyDocs } from '../../list-documents/models/my-docs';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private url = environment.apiUrl + 'balancerecon/';
  
  constructor(private http: HttpClient) { }

  postSaldoFile(data: FormData): Observable<MyDocs> {
    return this.http.post<MyDocs>(this.url, data);
  }
}
