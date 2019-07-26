import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lict-documents',
  templateUrl: './lict-documents.component.html',
  styleUrls: ['./lict-documents.component.css']
})
export class LictDocumentsComponent implements OnInit {

  displayedColumns = ['name', 'type', 'date', 'actions'];
  dataSource: any;
  value = 75;

  constructor(
    /*public dialogRef: MatDialogRef<LictDocumentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,*/
  ) { }

  ngOnInit() {
    let a1 = ['11', '12', '25'];
    let a2 = ['21', '22',];
    let a3 = ['31', '32', '75'];
    let a4 = ['31', '32'];
    let a5 = ['31', '32', '75'];
    let a6 = ['31', '32', '75'];
    let a7 = ['31', '32'];
    let a8 = ['31', '32', '75'];
    let a9 = ['31', '32'];
    let a10 = ['31', '32', '75'];
    let a11 = ['31', '32', '75'];
    this.dataSource = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11];
  }

  onOkClick(doc: string) {
    /*this.saldoService.postGetDocument(doc).subscribe(d => { 
      this.respons = d; 
      this.checkRespons(this.respons); 
      error => console.log(error)
    });*/
  }

  onNoClick(): void {
    let e = 9;
  }

  checkRespons(respons) {
    let e = 9;
  }
}
