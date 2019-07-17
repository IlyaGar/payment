import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentsResponse } from '../models/documents-response';
import { DocumentsQuery } from '../models/documents-query';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { DocEdit } from 'src/app/models/doc-edit';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = environment.apiUrl + 'doclist/';
  private urldocedit = environment.apiUrl + '!!!!/';

  constructor(private http: HttpClient) { }

  postDocument(doc: DocumentsQuery): Observable<DocumentsResponse> {
    if(doc.statusParam == 'Все объекты') doc.statusParam = "";
    //let v = JSON.stringify(doc);
    return this.http.post<DocumentsResponse>(this.url, doc);
  }

  postDocEditQuery(doc: DocEditQuery): Observable<DocEdit> {
    return this.http.post<DocEdit>(this.urldocedit, doc);
  }
}



