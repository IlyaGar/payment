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

  nameCookie = 'user';
  isUnCorect = false;
  response: string;
  isNoRules: boolean = false;

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
      if(name) {
        let newDocQuery = new NewDocQuery(this.getToken(this.nameCookie), name);
        this.workService.postNewDocument(newDocQuery).subscribe(d => { this.response = d; this.createDocument(this.response); }); 
        this.dialogRef.close(name);
      }
      else this.isUnCorect = true;
  }

  createDocument(data) {
    if(data.id)
      this.closeDialogOk(data);
      //this.router.navigate(['/work', data]);
    if(data.status == 'false')
      this.isNoRules = true;
    if(data.status == 'error')
      alert(data.status + " " + "Попробуйте еще раз");
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
