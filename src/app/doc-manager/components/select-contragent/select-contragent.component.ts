import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ContrReq } from '../../models/contr-req';
import { ContrResp } from '../../models/contr-resp';
import { DocService } from '../../service/doc.service';

@Component({
  selector: 'app-select-contragent',
  templateUrl: './select-contragent.component.html',
  styleUrls: ['./select-contragent.component.css']
})
export class SelectContragentComponent implements OnInit {

  @Input() data: string;
  @Output() newItemEvent = new EventEmitter<ContrResp>();
  
  nameCookie = 'user';
  name: string = '';
  contragents: Array<ContrResp> = [];
  selectedItem: ContrResp = new ContrResp('', '', '');

  constructor(
    private docService: DocService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
  }

  onSearch() : void {
    if(this.name.length >= 3) {
      this.docService.getContragent(new ContrReq(this.getToken(this.nameCookie), this.name.toLocaleLowerCase())).subscribe(response => {
        if(response) {
          this.contragents = response;
        }
      },
      error => { 
        console.log(error);
        alert("Сервер не отвечает.");
      });
    }
  }
  
  getToken(nameCookie: string) : string {
    if(this.cookieService.check(nameCookie)) {
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        return loginFromCookie.token
      }
    }
    else return '';
  }

  onSelectContrAgent(contragent: ContrResp) : void {
    this.selectedItem.fullname = contragent.fullname;
    this.newItemEvent.emit(contragent);
  }
}
