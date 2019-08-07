import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MyDocs } from '../models/my-docs';
import { DownList } from '../models/down-list';
import { FileDel } from '../models/file-delete';
import { Status } from 'src/app/models/status';
import { DownLoad } from '../models/download-file';

@Injectable({
  providedIn: 'root'
})
export class ListDocumentsService {

  private urllist = environment.apiUrl + 'downlist/';
  private urldel = environment.apiUrl + 'deletefile/';
  private urldownload = environment.apiUrl + 'download/';
  
  constructor(private http: HttpClient) { }

  postListMyDocs(token: DownList): Observable<MyDocs> {
    return this.http.post<MyDocs>(this.urllist, token);
  }

  postDeleteMyDocs(del: FileDel): Observable<Status> {
    return this.http.post<Status>(this.urldel, del);
  }

  downloadFileSystem(data: DownLoad): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Accept': 'application/octet-stream'
    });
    return this.http.post<any>(this.urldownload, data, {headers: headers, responseType: 'blob' as 'json' });
  }
}
