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
import { SaveFormComponent } from 'src/app/dialog-windows/save-manager/save-form/save-form.component';
import { GetContract } from 'src/app/order-manager/models/order-query';
import { OrderListItem } from 'src/app/order-manager/models/order-list';
import { DetailPartnerFormComponent } from 'src/app/dialog-windows/detail-partner-view/detail-partner-form/detail-partner-form.component';

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
  docEdit: DocEdit = new DocEdit("", "", "", "", "", "", null);
  doc: any;
  idDocument: string;
  nameCookie = 'user';
  token: string;
  listOrders: string[] = [];
  listPartners: string[] = [];
  listProviders: string[] = [];

  /*listData: Array<string> = ['provider', '1001', 'saldo', '2019.06.05', '21', 'no', '123456', 'lalala', '1234', '987, 1, 2'];
  listlistData: Array<Array<string>> = [this.listData];
  docEditTest: DocEdit = new DocEdit("true", "22", "test-name", "2019-05-06", "2236", "Черновик", this.listlistData);*/

  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private common: CommonService,
    private cookieService: CookieService,
    private activateRoute: ActivatedRoute
    ) {
        activateRoute.params.subscribe(params => { this.doc = params; this.getDocEditQuery(); });
      }

  ngOnInit() {
    if(this.idDocument) {
      this.workService.postGetDocument(this.docEditQuery).subscribe(d =>  { this.docEdit = d; this.addIdRow(); this.removeZeros(); });
      this.token = this.getToken(this.nameCookie);
    }

    //this.token = this.getToken(this.nameCookie);
    //this.docEdit = this.docEditTest;
  }

  getDocEditQuery() {
    if(this.doc){
      this.idDocument = this.doc.id;
      this.docEditQuery = new DocEditQuery(this.getToken(this.nameCookie), this.idDocument);
    }
  }

  onEventSummChange(enterValue: string) {  
    //var splitted = enterValue.split(","); 
  } 

  onClickB() {
    this.docEditQuery = this.doc;
  }

  removeZeros() {
    if(this.docEdit) {
      //TypeError: Cannot read property 'includes' of undefined
      if(this.docEdit.docDate.includes(' ')) {
        var splitedPayDate = this.docEdit.docDate.split(' ');
        this.docEdit.docDate = splitedPayDate[0];
      }
      if(this.docEdit.docBody.length > 0) {
        this.docEdit.docBody.forEach(element => {
          var splitedPayDate = element[3].split(' ');
          element[3] = splitedPayDate[0];
        });
    }}
  }

  addIdRow() {
    let i = 0;
    this.docEdit.docBody.forEach(element => {
      element[10] = (i++).toString();
    });
  }

  openPartnerDialog(): void {
    const dialogRef = this.dialog.open(PartnerListComponent, {
      width: '880px',
      height: '680px',
      data: {list: this.getProviders()},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.listPartners = result;
        this.postlistPartners(this.listPartners);
      }
     });
  }

  openOrderDialog(provider: string, idrow: string): void {
    const dialogRef = this.dialog.open(OrderListComponent, {
      width: '600px',
      height: '500px',
      data: { token: this.token, provider: provider },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getStringContract(result);
      //this.docEdit.docBody.find(x => x[0] === provider)[9] = this.listProviders.toString();
      this.docEdit.docBody.find(x => x[10] === idrow)[9] = this.listProviders.toString();
    });
  }

  openSaveDialog(docNum: string): void {
    if(docNum === this.docEdit.docNum) {
      const dialogRef = this.dialog.open(SaveFormComponent, {
        width: '400px',
        height: '300px',
        data: {doc: this.docEdit, token: this.token},
      });
      dialogRef.afterClosed().subscribe(result => {
        let e = this.docEdit.docName;
      });
    }
  }

  openDetailedView() {
    const dialogRef = this.dialog.open(DetailPartnerFormComponent, {
      width: '1000px',
      height: '800px',
      data: {list: '!!!!'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let e = 9;
      }
     });
  }

  getStringContract(data: Array<OrderListItem>) {
    data.forEach(element => {
      this.listProviders.push(element.order);
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
    let partnerQuery = new SaveProvider(this.token, this.doc.id, data);
    this.workService.postlistPartners(partnerQuery).subscribe(d =>  { this.docEdit = d; this.removeZeros(); });
  }

  getProviders() {
    let list = [];
    if(this.docEdit.docBody.length > 0) {
      this.docEdit.docBody.forEach(element => {
        list.push(element[0]);
    });}
    return list;
  }

  getOrders(orders: string) {
    return orders.split(", "); 
  }

  transformSumm(event, summ){
    let list = [];
    for (var _i = 0; _i < event.split('').length; _i++) {
      if(_i % 3 === 0 && _i > 0) {
        list.push(' ');
      }
      list.push(event.split('')[_i]);
    }
    /*event.split('').forEach(element => {
      list.push(element);
      if(_i % 3 == 0 && _i > 3) {
        list.push(' '); }
        _i++;
    });*/
    console.log(list.toString());
  }
}
