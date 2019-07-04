import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkService } from '../work-service/work.service';
import { NewDocQuery } from '../models/new-doc-query';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DocEdit } from 'src/app/models/doc-edit';


@Component({
  selector: 'app-create-docum',
  templateUrl: './create-docum.component.html',
  styleUrls: ['./create-docum.component.css']
})
export class CreateDocumComponent implements OnInit {

  newDocQuery: NewDocQuery;
  docEdit: DocEdit = new DocEdit("", "", "", "", "", null, "");
  name: string;
  nameCookie = 'user';
  isUnCorect = false;
  idDocument: number;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private workService: WorkService,
    public dialogRef: MatDialogRef<CreateDocumComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  onOkClick(name: string) {
      //this.closeDialogOk(name);
      //let newDocQuery = new NewDocQuery(this.getToken(this.nameCookie), name);
      if(name) {
        this.newDocQuery = new NewDocQuery(this.getToken(this.nameCookie), name);
        //this.workService.postNewDocument(this.newDocQuery).subscribe(d =>  { this.docEdit = d; this.gotoWork(this.docEdit.docNum);});     
        //this.router.navigate(['/work', { token: this.getToken(this.nameCookie), docName: name , type: 'new'}]);
        this.workService.postNewDocument(this.newDocQuery).subscribe(d => { this.idDocument = d; this.gotoWork(this.idDocument); });  
        this.dialogRef.close();
      }
      else this.isUnCorect = true;
  }

  gotoWork(numberDocument: number) {
    this.router.navigate(['/work', numberDocument]);
  }

  closeDialogOk(data): void {
    this.dialogRef.close(data);
  }

  onNoClick(data): void {
    this.dialogRef.close();
  }

  getCookie(nameCookie: string) {
    if(this.cookieService.check(nameCookie)){
      return this.cookieService.get(nameCookie);
    }
    else return false;
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
}
