import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkService } from '../work-service/work.service';
import { NewDocQuery } from '../models/new-doc-query';
import { DocMerge } from '../models/doc-merge';
import { AttentionFormComponent } from 'src/app/dialog-windows/dialog-attention/attention-form/attention-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  token: string;
  list: Array<string>;
}

@Component({
  selector: 'app-create-docum',
  templateUrl: './create-docum.component.html',
  styleUrls: ['./create-docum.component.css']
})

export class CreateDocumComponent implements OnInit {

  isUnCorect = false;
  response: string;
  isNoRules: boolean = false;
  name: string;

  constructor(
    private workService: WorkService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<CreateDocumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  onOkClick(name: string) {
    if(name) {
      if(!this.data.list) {
        this.postNewDocument(name); 
      }
      if(this.data.list) {
        this.postDocumentMerge(name);
      }
    }
    else this.isUnCorect = true;
  }

  postNewDocument(name: string) {
    let newDocQuery = new NewDocQuery(this.data.token, name);
    this.workService.postNewDocument(newDocQuery).subscribe(response => {
      if(response) {
        this.response = response; 
        this.checkResponse(this.response);
      } 
    },
      error => {
        console.log(error);
        alert("Сервер не отвечает.");
      }
    );
  }

  postDocumentMerge(name: string) {
    let docMerge = new DocMerge(this.data.token, name, this.data.list);
    this.workService.postDocumentMerge(docMerge).subscribe(response => { 
      if(response) {
        this.response = response; 
        this.checkResponse(this.response);
      } 
    },
    error => {
       console.log(error);
       alert("Сервер не отвечает.");
      }
    );
  }

  closeDialogOk(data): void {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkResponse(data) {
    if(data.id) {
      this.closeDialogOk(data);
    }
    if(data.status == 'false')
      this.isNoRules = true;
    if(data.status == 'error')
      this.openAttentionDialog(data.status);  
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
