import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SaldoService } from '../services/saldo.service';
import { Balance } from '../models/balans-item';
import { DomSanitizer } from '@angular/platform-browser';

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
  isFileSelected: boolean = false;
  isStDateSelected: boolean = false;
  isFnDateSelected: boolean = false;
  isDateSelected: boolean = false;

  name = 'Angular 5';
  fileUrl;

  
  constructor(

    private sanitizer: DomSanitizer,

    private saldoService: SaldoService,
    public dialogRef: MatDialogRef<SaldoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  onOkClick(doc: string) {
    this.postFileMethod();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkRespons(result) {
    let e = 9;
  }

  selectFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) { 
      this.isFileSelected = true;
      this.file = files[0];
    }
  }

  selectedStDate(event) {
    this.isStDateSelected = true;
  }

  selectedFnDate(event) {
    this.isFnDateSelected = true;
  }

  postFileMethod() {
    if(this.file) {
      let balans = new Balance(this.data.token, this.stdate, this.fndate);
      let formData = new FormData(); 
      formData.append('file', this.file, this.file.name);
      formData.append('balance', JSON.stringify(balans));
      console.log(formData.getAll('file'));
      console.log(formData.getAll('balance'));
      /*this.saldoService.postGetDocument(formData).subscribe((result) => {
        if(result) {   
          console.log(result);
          this.checkRespons(result);
        }
      });*/

      this.saldoService.postSaldoFile(formData).subscribe((result) => {
        if(result) {   
          console.log(result);
          this.downloadFile(result);
          this.checkRespons(result);
        }
      });
    }
  }
  downloadFile(data: any) {
    //const blob = new Blob([data], { type: 'text/csv' });
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }

  download() {
    let balans = new Balance(this.data.token, this.stdate, this.fndate);
    let formData = new FormData(); 
    formData.append('file', this.file, this.file.name);
    formData.append('balance', JSON.stringify(balans));
    console.log(formData.getAll('file'));
    console.log(formData.getAll('balance'));
    this.saldoService.postSaldoFile(formData).subscribe(response => {
			let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			const url= window.URL.createObjectURL(blob);
			window.open(url);
			window.location.href = response.url;
			//fileSaver.saveAs(blob, 'employees.json');
		}), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
}
