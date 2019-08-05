import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  status: string;
}

@Component({
  selector: 'app-attention-form',
  templateUrl: './attention-form.component.html',
  styleUrls: ['./attention-form.component.css']
})

export class AttentionFormComponent implements OnInit {

  isNull = false;
  isFalse = false;
  isError = false;
  isDeleteRow = false;
  isDeleteDoc = false;
  isUndefined = false;

  constructor(
    public dialogRef: MatDialogRef<AttentionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit() {
    if(!this.data)
      this.isNull = true;
    else {
      switch(this.data.status) { 
        case 'false': { 
          this.isFalse = true; 
          break; 
        } 
        case 'error': { 
          this.isError = true;
          break; 
        } 
        case 'deleterow': { 
          this.isDeleteRow = true;
          break; 
        } 
        case 'deletedoc': { 
          this.isDeleteDoc = true;
          break; 
        } 
        default: { 
          this.isUndefined = true;
          break; 
        } 
      } 
    }
  }

  onOkClick() {
    if(this.isDeleteRow === true)
      this.dialogRef.close(true);
    else
      if(this.isDeleteDoc === true)
        this.dialogRef.close(true);
      else 
        this.dialogRef.close();
  }

  onNoClick(): void {
    if(this.isDeleteRow === true)
      this.dialogRef.close(false);
    else  
      if(this.isDeleteDoc === true)
        this.dialogRef.close(false);
      else
        this.dialogRef.close();
  }
}
