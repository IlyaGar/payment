import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocEdit } from 'src/app/models/doc-edit';
import { WorkService } from 'src/app/work-manager/work-service/work.service';
import { Status } from 'src/app/models/status';
import { SaveDocQuery } from 'src/app/models/save-doc-query';

export interface DialogData {
  doc: DocEdit,
  token: string,
}

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {

  doc: DocEdit;
  token: string;
  isNoRules: boolean = false;
  isUser: boolean = false;
  isAccountant: boolean = false;
  isDirector: boolean = false;
  respons: any; 

  constructor(
    private workService: WorkService,
    public dialogRef: MatDialogRef<SaveFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(this.data as DialogData) {
      let e = 5;
    }
    if(this.data) {
      if(this.isDialogData(this.data)) {
        this.doc = this.data.doc;
        this.token = this.data.token;
        if(this.data.doc.accessRight === 'user')
          this.isUser = true;
        if(this.data.doc.accessRight === 'accountant')
          this.isAccountant = true;
        if(this.data.doc.accessRight === 'director')
          this.isDirector = true;
      }
    }
  }

  onOkClick() {
    let docSave = new SaveDocQuery(this.token, this.doc.docNum, this.doc.docName, this.doc.docStatus, this.doc.docBody);
    this.workService.postSaveDocument(docSave).subscribe(d => {this.respons = d; this.checkDoc(this.respons);},
      error => console.log(error));

      //this.checkDoc(this.doc);
      //this.checkDoc(new Status("error"));
  }

  onNoClick(data): void {
    this.dialogRef.close();
  }

  isDialogData(object: any): object is DialogData {
    if(typeof object.doc.docNum === 'string' && typeof object.token === 'string')
      return true;
    else return false;
  }

  checkDoc(data) {
    /*if(data instanceof DocEdit) {
      this.okClose(data);
    }*/
    if(data.status == 'true')
      this.okClose(this.doc);
    if(data.status == 'false')
      this.isNoRules = true;
    if(data.status == 'error')
      alert(data.status + " " + "Попробуйте еще раз")
  }

  okClose(data: DocEdit) {
    this.dialogRef.close(data);
  }
}
