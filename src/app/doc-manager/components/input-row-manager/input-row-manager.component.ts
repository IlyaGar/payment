import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContrResp } from '../../models/contr-resp';
import { InputRow } from '../../models/input-row';

@Component({
  selector: 'app-input-row-manager',
  templateUrl: './input-row-manager.component.html',
  styleUrls: ['./input-row-manager.component.css']
})
export class InputRowManagerComponent implements OnInit {

  @Input() data: InputRow;
  @Output() newItemEvent = new EventEmitter<InputRow>();

  date_start: Date;
  date_end: Date;
  date_post: Date;
  selectedContr: string;

  isBtOk = false;
  selectName = 'Выбор';
  currencyList = ['BYN', 'RUB', 'USD', 'EUR'];

  constructor() { }

  ngOnInit() {
  }

  onOkClick(): void {
    this.isBtOk = true;
    if(this.data.selectedContr && 
      this.data.date_start &&
      this.data.date_end && 
      this.data.date_post &&
      this.data.summa && 
      this.data.summa_type) {
        this.newItemEvent.emit(this.data);
      } 
  }

  onNoClick(): void {
    this.newItemEvent.emit(null);
  }

  inputContragent(event: ContrResp) {
    this.data.selectedContr = event.fullname;
  }
}
