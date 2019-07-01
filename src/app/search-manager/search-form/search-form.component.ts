import { Component, OnInit } from '@angular/core';
import { FilterDocument } from '../models/filter-document';
import { SearchService } from '../services/search.service';
import { CookieService } from 'ngx-cookie-service';
import { DocumentsResponse } from '../models/documents-response';
import { DocumentsQuery } from '../models/documents-query';
import { CommonService } from 'src/app/common/common.service';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  docsResponse: DocumentsResponse;
  docsQuery: DocumentsQuery;
  filter = new FilterDocument("", "", "Все объекты", null, null);
  docEditQuery: DocEditQuery;
  nameCookie = 'user';
  isData = false;
  isInit = false;
  isViewComponent = false;
  allSelected: string = '0';
  sumSelected: string = '0';
  statusSelect: string = 'Все объекты';
  token: string;

  constructor(private searchService: SearchService,
    private cookieService: CookieService,
    private service: CommonService,
    private router: Router,) { }

  ngOnInit() {
    this.isViewComponent = true;
    //this.service.events$.forEach(event => this.listenEvent());
    //this.service.events$.forEach(event => { console.log(event); this.listenEvent(event) });
    this.listenEvent('init');
  }

  listenEvent(event) 
  {
    if(event == 'login') this.loadData();
    if(event == 'logout') this.clearData();
    if(event == 'init')  this.loadData();
  }

  loadData() {
    let token = this.getToken(this.nameCookie);
    let stdate = ""; let fndate = "";
    if(token){
      this.docsResponse = new DocumentsResponse(null, "", "",);
      if(this.filter.startDate != null)
        stdate = this.filter.startDate.toString();
      if(this.filter.finishDate != null)
        fndate = this.filter.finishDate.toString();
      this.docsQuery = new DocumentsQuery(token, this.filter.nomer, this.filter.name, this.filter.status = this.statusSelect, stdate, fndate);
      //this.docsQuery = new DocumentsQuery(token, "", "", "", "", "");
      this.searchService.postDocument(this.docsQuery).subscribe(
        d => {this.docsResponse = d; this.isData = true; this.giveSumAndCount(this.isData);},
        error => console.log(error));
    }
  }

  clearData() {
    this.isData = false;
    this.onClearFilter();
    this.giveSumAndCount(this.isData);
    this.docsResponse = null;
    this.statusSelect = 'Все объекты';
  }

  giveSumAndCount(isData: boolean) {
    if(isData){
      //this.isData = true;
      this.allSelected = this.docsResponse.docCount;
      this.sumSelected = this.docsResponse.docSum;
    }
    else{
      this.allSelected = null;
      this.sumSelected = null;
      this.filter.status = 'Все объекты';
    }
  }

  onSendFilter(filter: FilterDocument) {
    let token = this.getToken(this.nameCookie);
    if(token){
      this.loadData();
      this.allSelected = this.docsResponse.docCount;
      this.sumSelected = this.docsResponse.docSum;
    }
  }

  onClearFilter() {
    this.filter = new FilterDocument("", "", "", null, null);
    this.statusSelect = 'Все объекты';
    this.loadData();
  }

  getCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      return this.cookieService.get(nameCookie);
    }
    else return false;
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        return loginFromCookie.token
      }
    }
    else return false;
  }

  onSelection(nom: string) {
    let docEditQuery = new DocEditQuery(nom, this.getToken(this.nameCookie));
    this.router.navigate(['/work']);
    this.searchService.postDocEditQuery(docEditQuery);
  }
}
