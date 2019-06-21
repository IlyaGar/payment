import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderListItem } from '../models/order-list';

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
    @Inject(MAT_DIALOG_DATA) public data: OrderListItem) { }

  ngOnInit() {
  }

  onOkClick() {
    if(this.enterOrder.length > 0)
      this.selection.selected.push(new OrderListItem(this.enterOrder));
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

  onEnterChange(enterValue: string) {  
    let e = this.enterOrder;
  } 
}
