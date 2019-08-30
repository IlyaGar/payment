import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { UpdateDate } from '../models/update-date';
import { UpdateService } from '../services/update.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-doc-data-form',
  templateUrl: './update-doc-data-form.component.html',
  styleUrls: ['./update-doc-data-form.component.css']
})
export class UpdateDocDataFormComponent implements OnInit {

  @ViewChild("dateToElement", { static: true }) dateToElement: ElementRef;
  @ViewChild("btSendElement", { static: true }) btSendElement: ElementRef;
  
  updateDate = new UpdateDate(null, null);

  constructor(
    private updateService: UpdateService,
    public dialogRef: MatDialogRef<UpdateDocDataFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onSetFocusForDate() {
    setTimeout(() => this.dateToElement.nativeElement.focus());
  }

  onSetFocusForEnter() {
    setTimeout(() => this.btSendElement.nativeElement.focus());
  }

  onSendDate() {
    let dateFrom = null;
    let dateTo = null;
    let dateFromString = "";
    let dateToString = "";
    if(this.updateDate.dateFrom) {
      dateFrom = new Date(this.updateDate.dateFrom);
      dateFromString = dateFrom.toLocaleDateString()
    }
    if(this.updateDate.dateTo) {
      dateTo = new Date(this.updateDate.dateTo);
      dateToString = dateTo.toLocaleDateString()
    }
    this.updateService.postUpdate(null).subscribe(response => {
      this.checkResponse(response);
    },
      error => { 
        console.log(error); 
        alert('Нет соединения с сервером');
      }
    );
  }

  checkResponse(response) {

  }
}
