import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { environment } from 'src/environments/environment';
import { OurDoc } from '../models/our-doc';

@Injectable({
  providedIn: 'root'
})
export class ArchiveDocService {

  private url = environment.apiUrl + 'create/ourdoc/';
  
  constructor(private http: HttpClient) { }

  postData(data: OurDoc): Observable<Status> {
    return this.http.post<Status>(this.url, data);
  }
}
