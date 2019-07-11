import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderListItem } from '../models/order-list';

export interface DialogData {
  list: Array<string>;
}

const ELEMENT_DATA: OrderListItem[] = [
  {order: "1"},
  {order: "2"},
  {order: "3"},
  {order: "4"},
  {order: "5"},
  {order: "6"},
  {order: "7"},
  {order: "8"},
  {order: "9"},
  {order: "10"},
  {order: "987"},
];

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  enterOrder: string;
  displayedColumns = ['order', 'select'];
  selection = new SelectionModel<OrderListItem>(true, []);
  dataSource = new MatTableDataSource<OrderListItem>(ELEMENT_DATA);

  constructor(public dialogRef: MatDialogRef<OrderListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    if(this.data.list) {
      let orderListFromWork = [];
      this.data.list.forEach(element => {
        orderListFromWork.push(new OrderListItem(element))
      });
      var array1 = ['a', 'b', 'c'];
      var array2 = ['d', 'e', 'f'];

      let cc = array1.concat(array2);
      let aaaa = this.dataSource.data.concat(orderListFromWork);
      //if(this.dataSource.data.find(x => x.order === this.data.list)) { //объединение списков выбранных заказов и заказов в базе  
      //}
      if(this.data.list.length > 0) {
        this.data.list.forEach(element => {
          this.dataSource.data.forEach(elementSelect => {
            if(element == elementSelect.order) {
              this.selection.select(elementSelect);
            }
          });
        });
      }
    }
  }

  onOkClick() {
    if(this.enterOrder) {
      if(this.enterOrder.length > 0) {
        if(!this.selection.selected.find(x => x.order === this.enterOrder))
          this.selection.selected.push(new OrderListItem(this.enterOrder));
      }
    }
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: OrderListItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.order + 1}`;
  }
}
