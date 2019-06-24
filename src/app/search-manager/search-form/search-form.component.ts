import { Component, OnInit } from '@angular/core';
import { FilterDocument } from '../models/filter-document';
import { SearchService } from '../services/search.service';
import { DocumentItem } from '../models/docum-item';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  docs: DocumentItem[];
  filter = new FilterDocument("", "", "", null, null);
  allSelected: string = '0';
  sumSelected: number = 0;

  constructor(private searchService: SearchService,
    private cookieService: CookieService,) { }

  ngOnInit() {
    //this.searchService.getDocs().subscribe(p => this.docs = p);
  }

  onSendFilter(filter: FilterDocument){
    let token = this.getCookie('user');
    if(token){
      this.allSelected = '4444';
      this.sumSelected = 5555;
    }
  }

  onClearFilter(){
    this.filter = new FilterDocument("", "", "", null, null);
  }

  getCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      return this.cookieService.get(nameCookie);
    }
    else return false;
  }
}
