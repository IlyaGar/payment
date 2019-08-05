import { Component, OnInit } from '@angular/core';
import { FilterDocument } from '../models/filter-document';
import { SearchService } from '../services/search.service';
import { CookieService } from 'ngx-cookie-service';
import { DocumentsResponse } from '../models/documents-response';
import { DocumentsQuery } from '../models/documents-query';
import { CommonService } from 'src/app/common/common.service';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateDocumComponent } from 'src/app/work-manager/create-docum/create-docum.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NewDocQuery } from 'src/app/work-manager/models/new-doc-query';
import { WorkService } from 'src/app/work-manager/work-service/work.service';

export class SelectedData{
  constructor(
    numdoc: string,
    isselect: boolean,
  ){}
}

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
  //selected: SelectedData[];
  //selected: Array<string> = [];
  selectedChecked: Array<boolean> = [];
  selectedNumber: Array<string> = [];
  nameCookie = 'user';
  isData = false;
  isInit = false;
  isViewComponent = false;
  isSelected = false;
  allSelected: string = '0';
  sumSelected: string = '0';
  statusSelect: string = 'Все объекты';
  token: string;
  isNoRules = false;
  response: string;

  constructor(
    private searchService: SearchService,
    private cookieService: CookieService,
    private common: CommonService,
    private router: Router,
    public dialog: MatDialog,
  ) {
      this.common.events$.forEach(event => { console.log(event); this.listenEvent(event) });
    }

  ngOnInit() {
    // let arr0 = ['20', '200', '200', '200 0', '200 0', '23400', '2300'];
    // let arr1 = ['21', '210', '210', '211 0', '211 0', '23411', '2311'];
    // let arr2 = ['22', '220', '220', '222 0', '222 0', '23422', '2322'];
    // this.docsResponse = new DocumentsResponse([arr0, arr1, arr2], '42', '124');
    // this.giveSumAndCount(true);
    // this.isViewComponent = true;

    if(this.cookieService.check(this.nameCookie)) {
      let fullData = this.cookieService.get(this.nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {

        const session = sessionStorage.getItem('currentUser');
        if(session) {
          this.filter = JSON.parse(session);
        }
        
        this.listenEvent('init');
      }
    }
    else this.router.navigate(['/login']);
  }

  listenEvent(event) {
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
      this.searchService.postDocument(this.docsQuery).subscribe(response => { 
        this.docsResponse = response; 
        this.isData = true; 
        this.giveSumAndCount(this.isData);
      }, 
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
    this.removeZeros();
  }

  removeZeros() {
    if(this.docsResponse.docList.length > 0) {
      this.docsResponse.docList.forEach(element => {
        var splitedCreateDate = element[3].split(' ');
        var splitedSaveDate = element[4].split(' ');
        element[3] = splitedCreateDate[0];
        element[4] = splitedSaveDate[0];
      });
    }
  }

  onSendFilter(filter: FilterDocument) {
    let token = this.getToken(this.nameCookie);
    if(token){
      this.loadData();
      this.allSelected = this.docsResponse.docCount;
      this.sumSelected = this.docsResponse.docSum;
      sessionStorage.setItem('currentUser', JSON.stringify({ 
        name: this.filter.name, 
        nomer: this.filter.nomer, 
        status: this.filter.status, 
        startDate: this.filter.startDate,
        finishDate: this.filter.finishDate}));
    }
  }

  onClearFilter() {
    sessionStorage.removeItem('currentUser');
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
    let docEditQuery = new DocEditQuery(this.getToken(this.nameCookie), nom);
    this.router.navigate(['/work', docEditQuery.docNum ]);
  }

  onMerge() {
    const dialogRef = this.dialog.open(CreateDocumComponent, {
      width: '400px',
      height: '260px',
      data: { token: this.getToken(this.nameCookie), list: this.selectedNumber },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/work', result.id]);
      }
    });
  }

  onCheck(data: MatCheckboxChange, numdoc: string) {
    if(data.checked) {
      this.isSelected = true;
      this.selectedChecked;
      this.selectedNumber.push(numdoc);
    }
    else {
      if(this.selectedNumber.includes(numdoc)) {
        for(var i = 0; i < this.selectedNumber.length; i++) { 
          if (this.selectedNumber[i] === numdoc) {
            this.selectedNumber.splice(i, 1); 
            i--;
          }
        }
      }
    }
    if(!this.selectedChecked.includes(true))
      this.isSelected = false;
  }

  onResetCheck(data, numdoc) {
    this.isSelected = false;
    this.selectedChecked = [];
    this.selectedNumber = [];
  }
}
