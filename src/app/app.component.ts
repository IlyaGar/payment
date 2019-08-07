import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormComponent } from './login-manager/login-form/login-form.component';
import { AttentionFormComponent } from './dialog-windows/dialog-attention/attention-form/attention-form.component';
import { delay } from 'q';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myValueSub: any;

  constructor(public dialog: MatDialog) { }

  title = 'app-docum';

  @HostListener('window:beforeunload', ['$event'])
  async ngOnDestroy($event) {
    if (this.myValueSub) {
      this.myValueSub.unsubscribe();
    }
   
    // await this.authService.logout(); beforeunloadHandler
   
    $event.preventDefault();
    $event.returnValue = 'A message.';
  }

  // @HostListener('window:beforeunload', ['$event'])
  // async beforeunloadHandler($event) {
  //   if (this.myValueSub) {
  //     this.myValueSub.unsubscribe();
  //   }
   
  //   // await this.authService.logout(); beforeunloadHandler
   
  //   $event.preventDefault();
  //   $event.returnValue = 'A message.';
  // }
}
