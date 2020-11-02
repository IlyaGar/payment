import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContrResp } from '../../models/contr-resp';

@Component({
  selector: 'app-select-contragent-dialog',
  templateUrl: './select-contragent-dialog.component.html',
  styleUrls: ['./select-contragent-dialog.component.css']
})
export class SelectContragentDialogComponent implements OnInit {

  contragent: string = '';

  constructor(
    public dialogRef: MatDialogRef<SelectContragentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  inputContragent(event: ContrResp) {
    this.contragent = event.fullname;
  }

  onOkClick(): void {
    this.dialogRef.close(this.contragent);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
