import { Component, OnInit } from '@angular/core';
import { TestData } from '../../models/test-data';
import { PartnerListComponent } from '../../partner-list/partner-list.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderListComponent } from '../../order-manager/order-list/order-list.component';

export interface OrderListItem {
  order: string;
}

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})

export class WorkFormComponent implements OnInit {

  animal: string;
  name: string;
  order: string;
  odrerList: OrderListItem[];

  list: string[] = [];

  tests: TestData[] = 
  [
    {id: 12, contr: "12", saldo: "12", lastpay: "12", scrap: "12", debt: "12", pay: "12", note: "12", contracts: ['12', '122', '112']},
    {id: 123,contr: "123", saldo: "123", lastpay: "123", scrap: "123", debt: "123", pay: "123", note: "123", contracts: []},
    {id: 234,contr: "234", saldo: "234", lastpay: "234", scrap: "234", debt: "234", pay: "234", note: "234", contracts: []},
    {id: 567,contr: "567", saldo: "567", lastpay: "567", scrap: "567", debt: "567", pay: "567", note: "567", contracts: ['567', '55567', '56667']},
    {id: 890,contr: "890", saldo: "890", lastpay: "890", scrap: "890", debt: "890", pay: "890", note: "890", contracts: ['890']},
  ];
  test = new TestData(0, "", "", "", "", "", "", "", null);

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onEnterChange(enterValue: string, newtest: TestData) {  
    var splitted = enterValue.split(","); 
    this.tests.find(t => t.id == newtest.id).contracts = splitted;
  } 

  onClickB(){
    let v = this.tests;
  }

  openPartnerDialog(): void {
    const dialogRef = this.dialog.open(PartnerListComponent, {
      width: '500px',
      height: '500px',
      data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openOrderDialog(id: number): void {
    this.list = [];
    const dialogRef = this.dialog.open(OrderListComponent, {
      width: '400px',
      height: '460px',
      data: {order: this.order}
    });
    dialogRef.afterClosed().subscribe(result => {
      result.forEach(element => {
        this.list.push(element.order);
      });
      this.tests.find(t => t.id == id).contracts = this.list;
    });
  }
}
