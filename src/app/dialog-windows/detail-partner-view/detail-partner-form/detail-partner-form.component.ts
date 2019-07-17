import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-partner-form',
  templateUrl: './detail-partner-form.component.html',
  styleUrls: ['./detail-partner-form.component.css']
})
export class DetailPartnerFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DetailPartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onOkClick() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
