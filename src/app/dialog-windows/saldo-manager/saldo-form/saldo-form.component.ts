import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SaldoService } from '../services/saldo.service';
import { Balance } from '../models/balans-item';
import { DomSanitizer } from '@angular/platform-browser';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';

@Component({
  selector: 'app-saldo-form',
  templateUrl: './saldo-form.component.html',
  styleUrls: ['./saldo-form.component.css']
})
export class SaldoFormComponent implements OnInit {

  doc: string = '';
  respons: File;
  stdate: string;
  fndate: string;
  files: Array<any>;
  filesName: Array<string>;
  fileUrl: any;
  isFileSelected: boolean = false;
  isStDateSelected: boolean = false;
  isFnDateSelected: boolean = false;
  isSelected: boolean = false;
  isFileSent: boolean = false;
  
  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private saldoService: SaldoService,
    public dialogRef: MatDialogRef<SaldoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.stdate = new Date().toLocaleDateString().split(".").reverse().join("-");
    this.fndate = new Date().toLocaleDateString().split(".").reverse().join("-");
  }

  onOkClick() {
    this.postFileMethod();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) { 
      this.files = files;
      this.isFileSelected = true;
      if(this.stdate) {
        this.isStDateSelected = true;
        if(this.fndate) {
          this.isFnDateSelected = true;
          if(this.files) {
            this.isSelected = true;
          }
        }
      }
    } else this.isFileSelected = false;
  }

  selectedStDate() {
    if(this.stdate) {
      this.isStDateSelected = true;
      if(this.isFnDateSelected) 
        if(this.isFileSelected) 
          this.isSelected = true;    
    }
    else {
      this.isStDateSelected = false;
      this.isSelected = false;    
    }
  }

  selectedFnDate() {
    if(this.fndate) {
      this.isFnDateSelected = true;
      if(this.isStDateSelected) 
        if(this.isFileSelected)
          this.isSelected = true;
    }
    else {
      this.isFnDateSelected = false;
      this.isSelected = false;    
    }
  }

  postFileMethod() {
    if(this.files.length > 0) {
      let formData = new FormData(); 
      let startDate = new Date(this.stdate);
      let finishtDate = new Date(this.fndate);
      let balans = new Balance(this.data.token, startDate.toLocaleDateString(), finishtDate.toLocaleDateString());
      for(let i = 0; i < this.files.length; i++){
        formData.append('file', this.files[i], this.files[i].name);
      }
      formData.append('balance', JSON.stringify(balans));
      // console.log(formData.getAll('file'));
      // console.log(formData.getAll('balance'));
      this.saldoService.postSaldoFile(formData).subscribe((response) => {
        if(response) {   
          this.checkResponse(response);
        }
        else {
          console.log(response);
          this.openAttentionDialog(response);
        }
      });
      // this.onNoClick();
      this.isFileSent = true;
    }
  }

  checkResponse(response) {
    if(response.status === 'true')
      this.openAttentionDialog('upload');
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
