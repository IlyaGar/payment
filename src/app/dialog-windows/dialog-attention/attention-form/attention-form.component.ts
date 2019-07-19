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

  constructor(
    public dialogRef: MatDialogRef<AttentionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data.status === 'false')
      this.isFalse = true;
    if(this.data.status === 'error')
      this.isError = true;
  }

  onOkClick() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
