import { Component, OnInit } from '@angular/core';
import { PartnerListComponent } from '../../partner-manager/partner-list/partner-list.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderListComponent } from '../../order-manager/order-list/order-list.component';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute} from '@angular/router';
import { WorkService } from '../work-service/work.service';
import { DocEdit } from 'src/app/models/doc-edit';
import { NewDocQuery } from '../models/new-doc-query';
import { CookieService } from 'ngx-cookie-service';
import { PartnerQuery } from '../models/partner-query';


@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})

export class WorkFormComponent implements OnInit {

  docEditQuery: DocEditQuery;
  newDocQuery: NewDocQuery;
  docEdit: DocEdit = new DocEdit("", "", "", "", "", null, "");
  doc: any;
  idDocument: string;
  nameCookie = 'user';
  token: string;
  listOrders: string[] = [];
  listPartners: string[] = [];

  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private common: CommonService,
    private cookieService: CookieService,
    private activateRoute: ActivatedRoute) {
      activateRoute.params.subscribe(params => { this.doc = params; this.getDocEditQuery(); });
     }

  ngOnInit() {
    if(this.idDocument) {
      this.workService.postGetDocument(this.docEditQuery).subscribe(d =>  { this.docEdit = d; this.removeZeros(); });
      this.token = this.getToken(this.nameCookie);
    }
  }

  getDocEditQuery() {
    if(this.doc){
      this.idDocument = this.doc.id;
      this.docEditQuery = new DocEditQuery(this.getToken(this.nameCookie), this.idDocument);
    }
  }

  onEnterChange(enterValue: string, newtest: DocEdit) {  
    /*var splitted = enterValue.split(","); 
    this.tests.find(t => t.id == newtest.id).contracts = splitted;*/
  } 

  onClickB() {
    this.docEditQuery = this.doc;
  }

  removeZeros() {
    if(this.docEdit.docBody) {
      this.docEdit.docBody.forEach(element => {
        var splitedPayDate = element[2].split(' ');
        element[2] = splitedPayDate[0];
      });
    }
  }

  openPartnerDialog(): void {
    const dialogRef = this.dialog.open(PartnerListComponent, {
      //width: '52.5vw',
      //height: '75vh',
      width: '880px',
      height: '680px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listPartners = result;
      this.postlistPartners(this.listPartners);
     });
  }

  openOrderDialog(id: number): void {
    //this.listOrders = [];
    const dialogRef = this.dialog.open(OrderListComponent, {
      width: '400px',
      height: '460px',
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.tests.find(t => t.id == id).contracts = this.list;
    });
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

  postlistPartners(data) {
    let partnerQuery = new PartnerQuery(this.token, this.doc.id, data);
    this.workService.postlistPartners(partnerQuery).subscribe(d => this.docEdit = d);
  }
}
