import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { Observable } from 'rxjs';
import { DocEdit } from 'src/app/models/doc-edit';
import { NewDocQuery } from '../models/new-doc-query';
import { SaveProvider } from '../models/save-provider';
import { SaveDocQuery } from 'src/app/models/save-doc-query';
import { Status } from 'src/app/models/status';
import { DeleteDoc } from 'src/app/models/doc-delete';
import { DocMerge } from '../models/doc-merge';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private urldoc = environment.apiUrl + 'docbody/';
  private urlnew = environment.apiUrl + 'newdoc/';
  private urlsave = environment.apiUrl + 'saveas/';
  private urldelete = environment.apiUrl + 'deletedoc/';
  private urlpartner = environment.apiUrl + 'provider/set/';
  private urlmerge = environment.apiUrl + 'union/';
  private urlfile = environment.apiUrl + 'payonec/';

  constructor(private http: HttpClient) { }

  postGetDocument(doc: DocEditQuery): Observable<DocEdit> {
    return this.http.post<DocEdit>(this.urldoc, doc);
  }

  postNewDocument(doc: NewDocQuery): Observable<string> {
    return this.http.post<string>(this.urlnew, doc);
  }

  postDocumentMerge(doc: DocMerge): Observable<string> {
    return this.http.post<string>(this.urlmerge, doc);
  }

  postlistPartners(doc: SaveProvider): Observable<DocEdit> {
    return this.http.post<DocEdit>(this.urlpartner, doc);
  }

  postSaveDocument(doc: SaveDocQuery): Observable<Status> {
    return this.http.post<Status>(this.urlsave, doc);
  }

  postDeleteDocument(doc: DeleteDoc): Observable<Status> {
    return this.http.post<Status>(this.urldelete, doc);
  }

  postFile1C(file: FormData): Observable<Status> {
    return this.http.post<Status>(this.urlfile, file);
  }

  /*postFile1C(files: FileList): Observable<Status> {
    return this.http.post<Status>(this.urlfile, files);
  }*/
}
