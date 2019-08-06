import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { AttentionFormComponent } from './dialog-windows/dialog-attention/attention-form/attention-form.component';
import { delay } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  istemp = false;
  temp: any;

  constructor(public dialog: MatDialog) { }

  title = 'app-docum';

  // @HostListener('window:beforeunload', ['$event'])
  // async beforeunloadHandler(event) {
  //   //this.openAttentionDialog('close');
  //   await delay(10000);
  //   console.log('close');
  // }

  // openAttentionDialog(status) {
  //   const dialogRef = this.dialog.open(AttentionFormComponent, {
  //     width: '400px',
  //     height: '200px',
  //     data: {status: status},
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.istemp = result;
  //       this.chek(this.istemp);
  //     }
  //   });
  // }

  // chek(temp) {
  //   alert(temp);
  // }
}
