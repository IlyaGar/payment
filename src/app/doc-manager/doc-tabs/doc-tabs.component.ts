import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GetGroup } from '../models/get-group';
import { StartData } from '../models/start-data';
import { DocService } from '../service/doc.service';

@Component({
  selector: 'app-doc-tabs',
  templateUrl: './doc-tabs.component.html',
  styleUrls: ['./doc-tabs.component.scss']
})
export class DocTabsComponent implements OnInit {

  tabIndex: number = 0;
  tabGroup: string = '';
  startData: StartData;
  nameCookie = 'user';

  constructor(
    private docService: DocService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.docService.getGroup(new GetGroup(this.getToken(this.nameCookie))).subscribe(response => {
      if(response) {
        this.startData = new StartData(this.tabIndex + 1, response.group);
        this.tabGroup = response.group;
      }
    },
    error => { 
      console.log(error);
    });
  }

  selectedTab($event) {
    this.tabIndex = $event.index;
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)) {
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        return loginFromCookie.token
      }
    }
    else return '';
  }
}