import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/models/status';
import { environment } from 'src/environments/environment';
import { AnswGroup } from '../models/answ-group';
import { ContrReq } from '../models/contr-req';
import { ContrResp } from '../models/contr-resp';
import { GetDogovorHistory } from '../models/doc-history';
import { GetListOfDogovor } from '../models/doc-list';
import { AddDogovorByRukovod } from '../models/doc-ruc';
import { EditDogovorByRukovod } from '../models/doc-ruc-edit';
import { EditDogovorByOffice } from '../models/doc-secretary';
import { GetGroup } from '../models/get-group';
import { RespHistory } from '../models/resp-history';
import { RowDogovor } from '../models/row-dogowor';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private urlList = environment.apiUrl + 'getlistofdogovor/';
  private urlAdd = environment.apiUrl + 'adddogovorbyrukovod/';
  private urlEditRuk = environment.apiUrl + 'editdogovorbyrukovod/';
  private urlEditOffice = environment.apiUrl + 'editdogovorbyoffice/';
  private urlUserGroup = environment.apiUrl + 'usergroup/';
  private urlContr = environment.apiUrl + 'contragent/';
  private urlHistory = environment.apiUrl + 'reqdogovorhistory/';

  constructor(private http: HttpClient) { }

  getListOfDogovor(data: GetListOfDogovor): Observable<Array<RowDogovor>> {
    return this.http.post<Array<RowDogovor>>(this.urlList, data);
  }

  postDogovor(data: AddDogovorByRukovod): Observable<Status> {
    return this.http.post<Status>(this.urlAdd, data);
  }

  editDogovorRukov(data: EditDogovorByRukovod): Observable<Status> {
    return this.http.post<Status>(this.urlEditRuk, data);
  }

  editDogovorOffice(data: EditDogovorByOffice): Observable<Status> {
    return this.http.post<Status>(this.urlEditOffice, data);
  }

  getGroup(data: GetGroup): Observable<AnswGroup> {
    return this.http.post<AnswGroup>(this.urlUserGroup, data);
  }

  getContragent(data: ContrReq): Observable<Array<ContrResp>> {
    return this.http.post<Array<ContrResp>>(this.urlContr, data);
  }

  getHistory(data: GetDogovorHistory): Observable<Array<RespHistory>> {
    return this.http.post<Array<RespHistory>>(this.urlHistory, data);
  }
}
