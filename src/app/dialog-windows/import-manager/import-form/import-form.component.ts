import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ImportService } from '../services/import.service';
import { PayOne } from 'src/app/models/pay-one';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';

export interface DialogData {
  token: string;
  docNum: string;
}

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.css']
})
export class ImportFormComponent implements OnInit {

  files: any;
  isFileSelected: boolean = false;
  isFileSent: boolean = false;

  constructor(
    private importService: ImportService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImportFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
  }

  selectFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) { 
      this.files = files;
      this.isFileSelected = true;
    } else this.isFileSelected = false;
  }

  postFileMethod() {
    if(this.files.length > 0) {
      let formData = new FormData(); 
      for(let i = 0; i < this.files.length; i++){
        formData.append('file', this.files[i], this.files[i].name);
      }
      formData.append("PayOne", JSON.stringify(new PayOne(this.data.token, this.data.docNum)));
      // console.log(formData.getAll('file'));
      // console.log(formData.getAll('PayOne'));
      this.importService.postFileExcel(formData).subscribe(response => {
        if(response) {
          this.checkResponse(response);
        } 
        else {
          console.log(response);
          this.openAttentionDialog(response);
        }
      }, error => console.log(error));  
    }
  }  

  checkResponse(response) {
    if(response.status === 'true') {
      this.openAttentionDialog('upload');
      this.isFileSent = false;
    }
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
