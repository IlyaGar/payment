import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private url = environment.apiUrl + '!!!!!!!/';
  
  constructor(private http: HttpClient) { }

  postUpdate(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
