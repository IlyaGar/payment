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

  postGetDocument(doc: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:63572/api/docs', doc);
  }

  postSaldoFile(data: FormData): Observable<MyDocs> {
    return this.http.post<MyDocs>(this.url, data);
  }

  downloadFileSystem(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/octet-stream',
      })
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Accept': 'application/octet-stream'
    });
    //return this.http.get<any>('http://localhost:63572/api/docs', {headers: headers, responseType: 'blob' as 'json' });
    return this.http.get('http://localhost:63572/api/docs', {headers: headers, observe: 'response', responseType: 'blob'});
  }
}
