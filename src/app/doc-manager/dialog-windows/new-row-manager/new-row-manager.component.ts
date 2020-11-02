import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDogovorByRukovod } from '../../models/doc-ruc';
import { InputRow } from '../../models/input-row';

interface DialogData {
  addDogovorByRukovod: AddDogovorByRukovod
}

@Component({
  selector: 'app-new-row-manager',
  templateUrl: './new-row-manager.component.html',
  styleUrls: ['./new-row-manager.component.scss']
})
export class NewRowManagerComponent implements OnInit {

  inputRow: InputRow = new InputRow(null, null, null, '', '', '');

  constructor(
    public dialogRef: MatDialogRef<NewRowManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
  }

  actionItem(event: InputRow) {
    if(event) {
      this.data.addDogovorByRukovod.date_start = this.datePipe.transform(event.date_start,"dd.MM.yyyy");
      this.data.addDogovorByRukovod.date_end = this.datePipe.transform(event.date_end,"dd.MM.yyyy");
      this.data.addDogovorByRukovod.date_post = this.datePipe.transform(event.date_post,"dd.MM.yyyy");
      this.data.addDogovorByRukovod.contragent = event.selectedContr;
      this.data.addDogovorByRukovod.summa = event.summa;
      this.data.addDogovorByRukovod.summa_type = event.summa_type;
      this.dialogRef.close(this.data.addDogovorByRukovod);
    }
    else this.dialogRef.close(false);
  }
}
