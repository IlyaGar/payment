import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditDogovorByOffice } from '../../models/doc-secretary';

interface DialogData {
  editDogovorByOffice: EditDogovorByOffice
}

@Component({
  selector: 'app-edit-row-office',
  templateUrl: './edit-row-office.component.html',
  styleUrls: ['./edit-row-office.component.css']
})
export class EditRowOfficeComponent implements OnInit {

  getdate: any;
  fileName: string = '';
  fileToUpload: File = null;
  
  constructor(
    public dialogRef: MatDialogRef<EditRowOfficeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    let dS = this.data.editDogovorByOffice.date_get.split(' ')[0].split('.');
    this.getdate = new Date(`${dS[1]}.${dS[0]}.${dS[2]}`);
    this.fileName = this.data.editDogovorByOffice.file_link;
  }

  onOkClick(): void {
    this.data.editDogovorByOffice.date_get = this.datePipe.transform(this.getdate,"dd.MM.yyyy");
    this.data.editDogovorByOffice.file_link = this.fileName;
    this.dialogRef.close(this.data.editDogovorByOffice);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileName = this.fileToUpload.name;
  }
}
