import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkService } from '../work-service/work.service';
import { NewDocQuery } from '../models/new-doc-query';
import { DocMerge } from '../models/doc-merge';
import { AttentionFormComponent } from 'src/app/dialog-windows/dialog-attention/attention-form/attention-form.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialogRef: MatDialogRef<CreateDocumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  onOkClick(name: string) {
      if(name) {
        if(!this.data.list) {
          let newDocQuery = new NewDocQuery(this.data.token, name);
          this.workService.postNewDocument(newDocQuery).subscribe(response => { this.response = response; this.createDocument(this.response); }); 
        }
        if(this.data.list) {
          let docMerge = new DocMerge(this.data.token, name, this.data.list);
          this.workService.postDocumentMerge(docMerge).subscribe(response => { this.response = response; this.createDocument(this.response); }); 
        }
      }
      else this.isUnCorect = true;
  }

  closeDialogOk(data): void {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createDocument(data) {
    if(data.id)
      this.closeDialogOk(data);
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
