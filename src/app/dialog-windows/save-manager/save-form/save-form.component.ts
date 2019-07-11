import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SaveFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

}
