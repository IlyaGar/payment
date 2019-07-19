import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../order-service/order.service';
import { GetContract } from '../models/order-query';
import { OrderListItem } from '../models/order-list';
import { ResponseContract } from '../models/response-contract';

export interface DialogData {
  token: string,
  provider: string,
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  enterOrder: string;
  displayedColumns = ['order'];
  selection = new SelectionModel<OrderListItem>(true, []);
  dataSource: any;
  list: Array<OrderListItem> = [];
  responseList: ResponseContract;

  constructor(
    private orderService: OrderService,
    public dialogRef: MatDialogRef<OrderListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    let query = new GetContract(this.data.token, this.data.provider);
    this.orderService.postGetPartner(query).subscribe(d => { this.responseList = d; this.loadTable(this.responseList); });
  }

  onOkClick() {
    if(this.enterOrder) {
      if(this.enterOrder.length > 0) {
        this.dialogRef.close(this.enterOrder);
      }
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectItem(element) {
    this.enterOrder = element + ' ';
  }

  loadTable(orderList) {
    if(orderList.list) {
      this.getOrderListItem(orderList.list);
      this.dataSource = new MatTableDataSource<OrderListItem>(this.list);
    }
    if(orderList.status == 'false'){}
  }

  getOrderListItem(orderList: Array<string>) {
    orderList.forEach(element => {
      this.list.push(new OrderListItem(element));
    });
  }
}
