import { Injectable } from '@angular/core';
import { DocumentItem } from '../models/docum-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = environment.apiUrl + 'api/docs/';

  constructor(private http: HttpClient) { }
  
  getDocs(): Observable<Array<DocumentItem>> {
    return this.http.get<Array<DocumentItem>>(this.url);
  }
}



