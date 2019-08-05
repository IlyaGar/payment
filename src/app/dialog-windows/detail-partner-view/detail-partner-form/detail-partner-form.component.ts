import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetailResponse } from '../models/detail-response';
import { DocInItem } from '../models/docin-item';
import { DocOutItem } from '../models/docout-item';
import { DetailPartnerService } from '../services/detail-partner.service';
import { GetDetail } from '../models/get-detail';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';

export interface DialogData {
  token: string;
  inn: string;
  provider: string;
}

@Component({
  selector: 'app-detail-partner-form',
  templateUrl: './detail-partner-form.component.html',
  styleUrls: ['./detail-partner-form.component.css']
})
export class DetailPartnerFormComponent implements OnInit {

  inn: string;
  token: string;
  provider: string;
  displayedColumnsIn = ['date', 'nomer', 'sort', 'summ'];
  dataSourceIn: any;
  displayedColumnsOut = ['date', 'summ', 'nomer'];
  dataSourceOut: any;
  detailResponse: DetailResponse = new DetailResponse('0', '0', null, null, '0', '0', '0', '0');
  listDocInItem: Array<DocInItem> = [];
  listDocOutItem: Array<DocOutItem> = [];
  dateFrom: string;
  dateTo: string;

  constructor(
    public dialog: MatDialog,
    private detailPartnerService: DetailPartnerService,
    public dialogRef: MatDialogRef<DetailPartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {

    // // demo data
    // let act1 = ['dateact', 'nomeract', 'typeop', 'summact'];
    // let act2 = ['dateact1', 'nomeract2', 'typeop3', 'summact4'];
    // this.detailResponse = new DetailResponse('element1', 'element2', [act1, act2, act2, act2, act2, act2, act2], [act1, act2, act2, act2, act2, act2, act2, act2]);
    // this.loadTableIn(this.detailResponse);
    // this.loadTableOut(this.detailResponse);

    // data
    if(this.data) {
      this.token = this.data.token;
      this.inn = this.data.inn;
      this.provider = this.data.provider;
      let getDetail = new GetDetail(this.token, this.inn, '', '');
      this.detailPartnerService.postGetDatail(getDetail).subscribe(response => {
        this.checkResponse(response);  
      });
    }

  }

  checkResponse(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        this.openAttentionDialog(response.status);
      }
      else { 
        this.detailResponse = response;
        this.removeZeros();
        this.loadTableIn(this.detailResponse);
        this.loadTableOut(this.detailResponse);
      }
    }
  }

  removeZeros() {
    if(this.detailResponse.docIn.length > 0) {
      this.detailResponse.docIn.forEach(element => {
        var splitedCreateDate = element[0].split(' ');
        element[0] = splitedCreateDate[0];
      });
    }
    if(this.detailResponse.docOut.length > 0) {
      this.detailResponse.docOut.forEach(element => {
        var splitedCreateDate = element[0].split(' ');
        element[0] = splitedCreateDate[0];
      });
    }
  }

  onSendDate() {
    let dateFrom = null;
    let dateTo = null;
    let dateFromString = "";
    let dateToString = "";
    if((this.dateFrom && !this.dateTo) || (!this.dateFrom && this.dateTo))
      this.openAttentionDialog('date');
    else {
      if(this.dateFrom) {
        dateFrom = new Date(this.dateFrom);
        dateFromString = dateFrom.toLocaleDateString()
      }
      if(this.dateTo) {
        dateTo = new Date(this.dateTo);
        dateToString = dateTo.toLocaleDateString()
      }
      let getDetail = new GetDetail(this.token, this.inn, dateFromString, dateToString);
      this.detailPartnerService.postGetDatail(getDetail).subscribe(response => {
        this.checkResponse(response);  
      });
    }
  }

  onOkClick() {
    this.dialogRef.close();
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadTableIn(detailResponse: DetailResponse) {
    if(detailResponse.docIn) {
      this.getArrayDocInItem(detailResponse.docIn);
      this.dataSourceIn = new MatTableDataSource<DocInItem>(this.listDocInItem);
    }
  }

  getArrayDocInItem(list: Array<Array<string>>) {
    this.listDocInItem = [];
    list.forEach(element => {
      this.listDocInItem.push(new DocInItem(element[0], element[1], element[2], element[3]));
    });
  }

  loadTableOut(detailResponse: DetailResponse) {
    if(detailResponse.docOut) {
      this.getArrayDocOutItem(detailResponse.docOut);
      this.dataSourceOut = new MatTableDataSource<DocOutItem>(this.listDocOutItem);
    }
  }

  getArrayDocOutItem(list: Array<Array<string>>) {
    this.listDocOutItem = [];
    list.forEach(element => {
      this.listDocOutItem.push(new DocOutItem(element[0], element[1], element[2], element[3]));
    });
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
