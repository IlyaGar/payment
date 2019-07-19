import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  status: string;
}

@Component({
  selector: 'app-attention-form',
  templateUrl: './attention-form.component.html',
  styleUrls: ['./attention-form.component.css']
})

export class AttentionFormComponent implements OnInit {

  isFalse = false;
  isError = false;
  isDelete = false;

  constructor(
    public dialogRef: MatDialogRef<AttentionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data.status === 'false')
      this.isFalse = true;
    if(this.data.status === 'error')
      this.isError = true;
    if(this.data.status === 'delete')
      this.isDelete = true;
  }

  onOkClick() {
    if(this.isDelete === true)
      this.dialogRef.close(true);
    else 
      this.dialogRef.close();
  }

  onNoClick(): void {
    if(this.isDelete === true)
      this.dialogRef.close(false);
    else
      this.dialogRef.close();
  }
}
