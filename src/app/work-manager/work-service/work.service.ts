import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { Observable } from 'rxjs';
import { DocEdit } from 'src/app/models/doc-edit';
import { NewDocQuery } from '../models/new-doc-query';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private url = environment.apiUrl + 'docbody/';
  private urlNew = environment.apiUrl + 'newdoc/';

  constructor(private http: HttpClient) { }

  postGetDocument(doc: DocEditQuery): Observable<DocEdit> {
    return this.http.post<DocEdit>(this.url, doc);
  }

  /*postNewDocument(doc: NewDocQuery): Observable<DocEdit> {
    return this.http.post<DocEdit>(this.urlNew, doc);
  }*/

  postNewDocument(doc: NewDocQuery): Observable<number> {
    return this.http.post<number>(this.urlNew, doc);
  }
}
