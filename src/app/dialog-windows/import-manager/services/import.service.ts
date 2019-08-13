import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private urlfile = environment.apiUrl + 'payonec/';
  
  constructor(private http: HttpClient) { }

  postFileExcel(files: FormData): Observable<any> {
    return this.http.post<any>(this.urlfile, files);
  }
}
