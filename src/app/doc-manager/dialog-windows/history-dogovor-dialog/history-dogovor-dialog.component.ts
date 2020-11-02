import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GetDogovorHistory } from '../../models/doc-history';
import { RespHistory } from '../../models/resp-history';
import { DocService } from '../../service/doc.service';

interface Dialog {
  history: GetDogovorHistory
}
@Component({
  selector: 'app-history-dogovor-dialog',
  templateUrl: './history-dogovor-dialog.component.html',
  styleUrls: ['./history-dogovor-dialog.component.css']
})
export class HistoryDogovorDialogComponent implements OnInit {

  dataList: Array<RespHistory> = [];
  displayedColumns = ['contragent', 'date_start', 'date_end', 'summa', 'date_post', 'date_get', 'file_link', 'current_date', 'who_set'];

  constructor(
    private docService: DocService,
    public dialogRef: MatDialogRef<HistoryDogovorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog,
  ) { }

  ngOnInit() {
    this.docService.getHistory(this.data.history).subscribe(response => {
      if(response) {
        this.dataList = response;
      }
    },
    error => { 
      console.log(error);
    });
  }

  onOkClick(): void {
    this.dialogRef.close(false);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}