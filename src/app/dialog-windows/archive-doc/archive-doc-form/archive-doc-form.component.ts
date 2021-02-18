import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';
import { OurDoc } from '../models/our-doc';
import { ArchiveDocService } from '../services/archive-doc.service';

@Component({
  selector: 'app-archive-doc-form',
  templateUrl: './archive-doc-form.component.html',
  styleUrls: ['./archive-doc-form.component.css']
})
export class ArchiveDocFormComponent implements OnInit {

  curDate: any;
  isSelectedDates = false;

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private archiveDocService: ArchiveDocService,
    public dialogRef: MatDialogRef<ArchiveDocFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  selectedDate() {
    if(this.curDate) {
      this.isSelectedDates = true;
    } else this.isSelectedDates = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.archiveDocService.postData(new OurDoc(this.data, this.datePipe.transform(new Date(this.curDate), 'dd.MM.yyyy'))).subscribe((response) => {
      if(response.status.toLocaleLowerCase() === 'ok') {   
        this.openAttentionDialog('upload');
      }
    });
    this.dialogRef.close();
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
