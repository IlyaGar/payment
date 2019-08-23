import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myValueSub: any;

  constructor(public dialog: MatDialog) { }

  title = 'app-docum';

  // //working option
  // @HostListener('window:beforeunload', ['$event'])
  // async ngOnDestroy($event) { // async beforeunloadHandler($event)
  //   if (this.myValueSub) {
  //     this.myValueSub.unsubscribe();
  //   }

  //  // await this.authService.logout(); beforeunloadHandler
   
  //   $event.preventDefault();
  //   $event.returnValue = 'A message.';
  // }
}
