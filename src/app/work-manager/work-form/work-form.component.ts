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
import { SaveProvider } from '../models/save-provider';

export interface OrderData {
  order: string;
}

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

  listData: Array<string> = ['provider', 'saldo', '2019.06.05', '21', 'no', '123456', 'lalala', '1234', '987, 1, 2', '1001'];
  listlistData: Array<Array<string>> = [this.listData];

  docEditTest: DocEdit = new DocEdit("true", "22", "test-name", "2019-05-06", "2236", this.listlistData, "ok");

  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private common: CommonService,
    private cookieService: CookieService,
    private activateRoute: ActivatedRoute) {
      activateRoute.params.subscribe(params => { this.doc = params; this.getDocEditQuery(); });
     }

  ngOnInit() {
    /*if(this.idDocument) {
      this.workService.postGetDocument(this.docEditQuery).subscribe(d =>  { this.docEdit = d; this.removeZeros(); });
      this.token = this.getToken(this.nameCookie);
    }*/

    this.docEdit = this.docEditTest;
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
      width: '880px',
      height: '680px',
      data: {list: this.getProviders()},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.listPartners = result;
      this.postlistPartners(this.listPartners);
     });
  }

  openOrderDialog(docNum: number, orders: string, idnote: string): void {
    const dialogRef = this.dialog.open(OrderListComponent, {
      width: '400px',
      height: '460px',
      data: {num: docNum, list: this.getOrders(orders), id: idnote},
    });
    dialogRef.afterClosed().subscribe(result => {
      /*let arr = this.docEdit.docBody.find(x => x[9] == idnote);
      var res = result.map(a => a.order).toString();
      arr[8] = res;*/

      this.docEdit.docBody.find(x => x[9] == idnote)[8] = result.map(a => ' ' +  a.order).toString().slice(1);
    });
  }

  openSaveDialog(docNum: string): void {
    if(docNum === this.docEdit.docNum) {
      const dialogRef = this.dialog.open(OrderListComponent, {
        width: '400px',
        height: '460px',
        //data: {num: docNum},
      });
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
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
    let partnerQuery = new SaveProvider(this.token, this.doc.id, data);
    this.workService.postlistPartners(partnerQuery).subscribe(d => this.docEdit = d);
  }

  getProviders() {
    let list = [];
    this.docEdit.docBody.forEach(element => {
      list.push(element[0]);
    });
    return list;
  }

  getOrders(orders: string) {
    return orders.split(", "); 
  }
}
