import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentsResponse } from '../models/documents-response';
import { DocumentsQuery } from '../models/documents-query';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url = environment.apiUrl + 'doclist/';

  constructor(private http: HttpClient) { }

  postDocument(doc: DocumentsQuery): Observable<DocumentsResponse> {
    if(doc.statusParam == 'Все объекты') doc.statusParam = "";
    return this.http.post<DocumentsResponse>(this.url, doc);
  }
}



