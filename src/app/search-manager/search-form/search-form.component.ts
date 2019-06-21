import { Component, OnInit } from '@angular/core';
import { FilterDocument } from '../models/filter-document';
import { SearchService } from '../services/search.service';
import { DocumentItem } from '../models/docum-item';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  docs: DocumentItem[];
  filter = new FilterDocument("", "", "", null, null);

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    //this.searchService.getDocs().subscribe(p => this.docs = p);
  }

  onSendFilter(filter: FilterDocument){
  }

  onClearFilter(){
    this.filter = new FilterDocument("", "", "", null, null);
  }
}
