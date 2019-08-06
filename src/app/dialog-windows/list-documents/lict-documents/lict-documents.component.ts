import { Component, OnInit } from '@angular/core';
import { ListDocumentsService } from '../services/list-documents.service';
import { Upload } from '../models/upload-item';
import { MyDocs } from '../models/my-docs';
import { AttentionFormComponent } from '../../dialog-attention/attention-form/attention-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DownList } from '../models/down-list';
import { FileDel } from '../models/file-delete';
import { DownLoad } from '../models/download-file';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-lict-documents',
  templateUrl: './lict-documents.component.html',
  styleUrls: ['./lict-documents.component.css']
})
export class LictDocumentsComponent implements OnInit {

  uploadItem: Upload = new Upload('', '', '', null);
  myDocs: MyDocs = new MyDocs(null);
  timer: any;
  nameCookie = 'user';
  file: any;
  fileUrl: any;
  url: string;

  urldownload: any;

  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private listDocumentsService: ListDocumentsService,
    
  ) { }

  ngOnInit() {
    this.getListData();
    this.timeout();
  }

  timeout() {
    var that = this;
    this.timer = setTimeout(function () {
      that.getListData();
      console.log('get MyDocs');
      that.timeout();
    }, 20000);
    
  } 

  getListData() {
    this.listDocumentsService.postListMyDocs(new DownList(this.getToken(this.nameCookie))).subscribe(response => { 
      if(response) {
        if(this.checkResponse(response))
          this.myDocs = response; 
      } 
      else {
        console.log(response);
        this.openAttentionDialog(response);
      }
    });  
  }

  checkResponse(response) {
    if(response.status === 'error') {
      console.log(response.status);
      this.openAttentionDialog(response.status);
      return false;
    }
    else return true;
  }

  onDownload(key: string, filename: string) {
    let downLoad = JSON.stringify(new DownLoad(key));
    this.url = environment.apiUrl + 'download/' + '?data=' + downLoad;

    var blob = new Blob([this.url], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}); // pass a useful mime type here
    this.urldownload = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', this.url);
    link.setAttribute('download', filename);
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    link.remove();
  }

  // downloadFile(response, filename) {
  //   const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
  //   this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

  //   const data = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.setAttribute('href', data);
  //   link.setAttribute('download', filename);
  //   link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
  //   link.remove();
  // }

  onDelete(key: string) {
    let filedelete = new FileDel(this.getToken(this.nameCookie), key);
    this.listDocumentsService.postDeleteMyDocs(filedelete).subscribe(response => { 
      if(response) {
        if(this.checkResponse(response))
          this.getListData();
      } 
      else {
        console.log(response);
        this.openAttentionDialog(response);
      }
    });  
  }

  openAttentionDialog(status) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  getToken(nameCookie: string) {
    if(this.cookieService.check(nameCookie)) {
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        return loginFromCookie.token
      }
    }
    else return false;
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    console.log('timer off');
  }
}
