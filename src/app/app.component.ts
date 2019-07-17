import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public dialog: MatDialog) { }

  title = 'app-docum';

  /*openLoginDialog(id: number): void {
    const dialogRef = this.dialog.open(LoginFormComponent, {
      width: '400px',
      height: '340px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }*/
}
