import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DetailResponse } from '../models/detail-response';
import { DocInItem } from '../models/docin-item';
import { DocOutItem } from '../models/docout-item';
import { DetailPartnerService } from '../services/detail-partner.service';
import { GetDetail } from '../models/get-detail';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';
import { PayDelQuery } from '../models/pay-delete-query';
import { Status } from 'src/app/models/status';
import { PayOkayQuery } from '../models/pay-okay-query';

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
  selectedRowIndex: string;
  selectedRow: DocOutItem;
  isSelectedDeleteRow: boolean = false;
  newSumm: number;
  newNum: string;
  newDate: string;
  isNewSumm: boolean = false;
  isNewNum: boolean = false;
  isNewDate: boolean = false;
  isNewPay: boolean = false;

  constructor(
    public dialog: MatDialog,
    private detailPartnerService: DetailPartnerService,
    public dialogRef: MatDialogRef<DetailPartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data) {
      this.token = this.data.token;
      this.inn = this.data.inn;
      this.provider = this.data.provider;
      let getDetail = new GetDetail(this.token, this.inn, '', '');
      this.detailPartnerService.postGetDatail(getDetail).subscribe(response => {
        this.checkResponse(response); 
      }, 
      error => { 
        console.log(error);
        this.openAttentionDialog('connection loss'); 
      });
    }
  }

  checkResponse(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status);
        }
        else 
          this.loadResponse(response);
      }
      else
        this.loadResponse(response);
    }
  }

  loadResponse(response) {
    this.detailResponse = response;
    this.removeZeros();
    this.loadTableIn(this.detailResponse);
    this.loadTableOut(this.detailResponse);
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

  onSelectRowClick(row: DocOutItem) {
    if(this.selectedRowIndex != row.id) {
      this.selectedRow = row;
      this.selectedRowIndex = row.id;
      this.isSelectedDeleteRow = true;
    }
    else {
      this.selectedRow = null;
      this.selectedRowIndex = "";
      this.isSelectedDeleteRow = false;
    }
  }

  onDeleteRow() {
    if(this.selectedRowIndex) {
      let payDelQuery = new PayDelQuery(this.data.token, this.selectedRow.date, this.selectedRow.summ, this.selectedRow.nomer, this.selectedRow.id)
      this.detailPartnerService.postDeleteRowOut(payDelQuery).subscribe(response => {
        this.checkResponseDelete(response); 
      }, 
      error => { 
        console.log(error);
        this.openAttentionDialog('connection loss'); });
    }
  }

  checkResponseDelete(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status);
        }
        else {
          this.ngOnInit();
          this.isSelectedDeleteRow = false;
          this.selectedRowIndex = '';
        }
      }
      else { 
        this.ngOnInit();
        this.isSelectedDeleteRow = false;
        this.selectedRowIndex = '';
      }
    }
  }

  onPostNewPay() {
    if(this.isNewPay) {
      let payDate = new Date(this.newDate).toLocaleDateString();
      let payOkayQuery = new PayOkayQuery(this.data.token, this.data.inn, payDate, this.newSumm.toString(), this.newNum);
      this.detailPartnerService.postNewRowOut(payOkayQuery).subscribe(response => {
        this.checkResponsePost(response); 
      }, 
      error => { 
        console.log(error);
        this.openAttentionDialog('connection loss'); });
    }
  }

  checkResponsePost(response) {
    if(!response)
      this.openAttentionDialog(response);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status);
        }
        else {
          this.ngOnInit();
          this.isNewPay = false;
          this.newSumm = null;
          this.newNum = null;
          this.newDate = null;
        }
      }
      else { 
        this.ngOnInit();
        this.isNewPay = false;
        this.selectedRowIndex = '';
      }
    }
  }

  onSelectSumm() {
    if(this.newSumm) {
      this.isNewSumm = true;
      if(this.isNewNum) 
        if(this.isNewDate) 
          this.isNewPay = true;    
    }
    else {
      this.isNewSumm = false;
      this.isNewPay = false;    
    }
  }

  onSelectNum() {
    if(this.newNum) {
      this.isNewNum = true;
      if(this.isNewSumm) 
        if(this.isNewDate) 
          this.isNewPay = true;    
    }
    else {
      this.isNewNum = false;
      this.isNewPay = false;    
    }
  }

  onSelectDate() {
    if(this.newDate) {
      this.isNewDate = true;
      if(this.isNewSumm) 
        if(this.isNewNum) 
          this.isNewPay = true;    
    }
    else {
      this.isNewDate = false;
      this.isNewPay = false;    
    }
  }
}
