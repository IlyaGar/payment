import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { PartnerService } from '../partner-service/partner.service';
import { ProviderQuery } from '../models/provider-query';
import { ProviderResponse } from '../models/provider-response';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'q';

export class SearchData {
  constructor(
    public value: string,
  ){}
}

export interface DialogData {
  animal: string;
  name: string;
}

export class Todo{
  constructor(
      public  name: string,
  ){}
}
export class Done{
  constructor(
      public  name: string,
  ){}
}
export class ListAgent{
  constructor(
      public  name: string,
  ){}
}

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css']
})
export class PartnerListComponent implements OnInit {

  providerQuery: ProviderQuery;
  providerResponse: ProviderResponse;
  nameCookie = 'user';
  searchData = new SearchData("");
  isData = true;
  isEmptySearch = true;
  isLoading = false;
  todo: Array<string> = [];
  done: Array<string> = [];
  newTodo: Array<string> = [];


  todoListAgent: ListAgent[] = 
  [
    { name: 'Get to work' },
    { name: 'Pick up groceries' },
    { name: 'Go home' },
    { name: 'Fall asleep' },
    { name: 'Get up' },
    { name: 'Brush teeth' },
    { name: 'Take a shower' },
    { name: 'Check e-mail' },
    { name: 'Walk dog' }
  ];
  doneListAgent: ListAgent[] = 
  [
    { name: 'Get up' },
    { name: 'Brush teeth' },
    { name: 'Take a shower' },
    { name: 'Check e-mail' },
    { name: 'Walk dog' }
  ];

  /*todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];*/

  constructor(public dialogRef: MatDialogRef<PartnerListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private cookieService: CookieService,
              private partnerService: PartnerService) { }

  ngOnInit() {
    this.todoListAgent.forEach(element => {
      let t = 0;
      this.todo.push(element.name.toString());
    });
    this.doneListAgent.forEach(element => {
      this.done.push(element.name);
    });

    //this.providerQuery = new ProviderQuery(this.getToken(this.nameCookie), ''),
    //this.partnerService.postGetPartner(this.providerQuery).subscribe(d => { this.providerResponse = d; this.initList(); } ); 
  }

  initList() {
    if(this.isEmptySearch) {
      if(this.providerResponse) {
        if(this.providerResponse.list != null) {
          if(this.providerResponse.list.length != 0) {
            this.todo = this.providerResponse.list;
            this.isData = true;
            this.isLoading = false;
          } else { this.isData = false; this.todo = null; }
        } else { this.isData = false; this.todo = null; }
      } else { this.isData = false; this.todo = null; }
    } else { this.isData = false; this.todo = null; }
  }
  
  onOkClick(data) {
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  drop(event: CdkDragDrop<string[]>, name: string) {
    if (event.previousContainer === event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
        if(name == 'todo') this['done'].splice(event.previousIndex, 1);//transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        else copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex); 
    }
  }

  dblclickMove(itemName: string, ...targets: string[]) {
    if(targets[0] == 'done') {
      this[targets[0]] = [
        ...this[targets[1]],
        ...this[targets[0]].push(itemName)
        ];
    } else {
      this[targets[1]].splice(this[targets[1]].indexOf(itemName), 1);
    }
      /*this[targets[0]] = [
        ...this[targets[1]].splice(this[targets[1]].indexOf(itemName), 1), 
        ...this[targets[0]]
        ];*/
  }

  autodrop(event: CdkDragDrop<string[]>, name: string) {
    if (event.previousContainer === event.container) {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
        if(name == 'todo') this['done'].splice(event.previousIndex, 1);//transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        else copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex); 
    }
    /*if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }*/
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie){
        return loginFromCookie.token
      }
    }
    else return false;
  }

  async onEnterChange(enterValue: string) {  
   /* if(enterValue != "") {
      this.isLoading = true;
      this.isEmptySearch = true;
      this.providerQuery = new ProviderQuery(this.getToken(this.nameCookie), enterValue);
      await delay(250);
      this.partnerService.postGetPartner(this.providerQuery).subscribe(d => { this.providerResponse = d; this.initList(); } ); 
    }
    else {
      this.isLoading = false;
      this.isEmptySearch = false;
      await delay(200);
      this.isData = true;
      this.todo = null;
    }*/
  } 
  
  onSearch(value) {
    this.providerQuery = new ProviderQuery(this.getToken(this.nameCookie), value);
    this.partnerService.postGetPartner(this.providerQuery).subscribe(d => { this.providerResponse = d; this.initList(); } );  
  }
    
  onClear() {
    this.searchData = new SearchData("");
  }
}
