import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditDogovorByRukovod } from '../../models/doc-ruc-edit';
import { InputRow } from '../../models/input-row';

interface DialogData {
  editDogovorByRukovod: EditDogovorByRukovod
}

@Component({
  selector: 'app-edit-row-manager',
  templateUrl: './edit-row-manager.component.html',
  styleUrls: ['./edit-row-manager.component.css']
})
export class EditRowManagerComponent implements OnInit {

  inputRow: InputRow = new InputRow(null, null, null, '', '', '');

  date_start: Date;
  date_end: Date;
  date_post: Date;

  constructor(
    public dialogRef: MatDialogRef<EditRowManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private datePipe: DatePipe,
  ) { 
      let dS = this.data.editDogovorByRukovod.date_start.split(' ')[0].split('.');
      this.date_start = new Date(`${dS[1]}.${dS[0]}.${dS[2]}`);
      let dE = this.data.editDogovorByRukovod.date_end.split(' ')[0].split('.');
      this.date_end = new Date(`${dE[1]}.${dE[0]}.${dE[2]}`);
      let dP = this.data.editDogovorByRukovod.date_post.split(' ')[0].split('.');
      this.date_post = new Date(`${dP[1]}.${dP[0]}.${dP[2]}`);

      this.inputRow = new InputRow(
        this.date_start, 
        this.date_end, 
        this.date_post, 
        this.data.editDogovorByRukovod.summa, 
        this.data.editDogovorByRukovod.summa_type,
        this.data.editDogovorByRukovod.contragent
      );
  }

  ngOnInit(): void {
    this.inputRow;
  }

  actionItem(event: InputRow) {
    if(event) {
      this.data.editDogovorByRukovod.date_start = this.datePipe.transform(event.date_start,"dd.MM.yyyy");
      this.data.editDogovorByRukovod.date_end = this.datePipe.transform(event.date_end,"dd.MM.yyyy");
      this.data.editDogovorByRukovod.date_post = this.datePipe.transform(event.date_post,"dd.MM.yyyy");
      this.data.editDogovorByRukovod.contragent = event.selectedContr;
      this.data.editDogovorByRukovod.summa = event.summa;
      this.data.editDogovorByRukovod.summa_type = event.summa_type;
      this.dialogRef.close(this.data.editDogovorByRukovod);
    }
    else this.dialogRef.close(false);
  }
}
