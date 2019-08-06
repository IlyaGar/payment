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
  file: any;
  fileUrl: any;
  isFileSelected: boolean = false;
  isStDateSelected: boolean = false;
  isFnDateSelected: boolean = false;
  isSelected: boolean = false;
  
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

  onOkClick(doc: string) {
    this.postFileMethod();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) { 
      this.file = files[0];
      this.isFileSelected = true;
      if(this.stdate) {
        this.isStDateSelected = true;
        if(this.fndate) {
          this.isFnDateSelected = true;
          if(this.file.name) {
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

  // onDownloadFile() {
  //   this.saldoService.downloadFileSystem().subscribe((response) => {
  //     if(response) { 
  //       this.downloadFile(response);
  //     }
  //   });;
  // }

  // downloadFile(response) {
  //   const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
  //   this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  //   let fn = "Оборотно-сальдовая 60 по 15.0719.xlsx";
  //   const data = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', data);
  //   link.setAttribute('download', fn);
  //   link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //   link.remove();
  // }

  postFileMethod() {
    if(this.file) {
      let startDate = new Date(this.stdate);
      let finishtDate = new Date(this.fndate);
      let balans = new Balance(this.data.token, startDate.toLocaleDateString(), finishtDate.toLocaleDateString());
      let formData = new FormData(); 
      formData.append('file', this.file, this.file.name);
      formData.append('balance', JSON.stringify(balans));
      console.log(formData.getAll('file'));
      console.log(formData.getAll('balance'));
      this.saldoService.postSaldoFile(formData).subscribe((response) =>  {
        if(response) {   
          this.checkResponse(response);
        }
        else {
          console.log(response);
          this.openAttentionDialog(response);
        }
      });
      this.onNoClick();
    }
  }

  checkResponse(result) {
    let e = 9;
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
