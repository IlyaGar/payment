import { Component, OnInit } from '@angular/core';
import { PartnerListComponent } from '../../partner-manager/partner-list/partner-list.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderListComponent } from '../../order-manager/order-list/order-list.component';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { WorkService } from '../work-service/work.service';
import { DocEdit } from 'src/app/models/doc-edit';
import { NewDocQuery } from '../models/new-doc-query';
import { CookieService } from 'ngx-cookie-service';
import { SaveProvider } from '../models/save-provider';
import { SaveFormComponent } from 'src/app/dialog-windows/save-manager/save-form/save-form.component';
import { DetailPartnerFormComponent } from 'src/app/dialog-windows/detail-partner-view/detail-partner-form/detail-partner-form.component';
import { DeleteDoc } from 'src/app/models/doc-delete';
import { Status } from 'src/app/models/status';
import { AttentionFormComponent } from 'src/app/dialog-windows/dialog-attention/attention-form/attention-form.component';
import { SaveDocQuery } from 'src/app/models/save-doc-query';
import { CommonService } from 'src/app/common/common.service';
import { PayOne } from 'src/app/models/pay-one';
import { OneCExp } from '../models/one-c-exp';
import { PrintQuery } from '../models/print-query';
import { ImportFormComponent } from 'src/app/dialog-windows/import-manager/import-form/import-form.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.css']
})

export class WorkFormComponent implements OnInit {
  
  docEditQuery: DocEditQuery;
  newDocQuery: NewDocQuery;
  docEdit: DocEdit = new DocEdit("", "", "", "", "", "", null);
  status: Status;
  doc: any;
  idDocument: string;
  nameCookie = 'user';
  token: string;
  fileToUpload: File;
  isHeld = false;
  confirmText: string = 'Да';
  cancelText: string = 'Нет';
  upFile: any;

  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private cookieService: CookieService,
    private router: Router,
    private common: CommonService,
    private activateRoute: ActivatedRoute
    ) {
        activateRoute.params.subscribe(params => { this.doc = params; this.getDocEditQuery(); });
      }

  ngOnInit() {
    if(this.cookieService.check(this.nameCookie)) {
      this.token = this.getToken(this.nameCookie);
      let fullData = this.cookieService.get(this.nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        if(this.idDocument)  
          this.loadDocument();
      }
    }
    else this.router.navigate(['/login']);
  }

  checkResponseGetDocument(response) {
    if(!response)
      this.openAttentionDialog(response, null);
    else {
      if(response.status as string) {
        if(response.status != 'true') {
          this.openAttentionDialog(response.status, null);
        }
        else {
          this.docEdit = response; 
          this.removeZeros(); 
        }
      }
      else {
        this.docEdit = response; 
        this.removeZeros(); 
      }
    }
  }

  loadDocument() {
    this.workService.postGetDocument(this.docEditQuery).subscribe(response =>  { 
      this.checkResponseGetDocument(response); 
    },
    error => {
      console.log(error);
      alert("Сервер не отвечает.");
     }
    );
  }

  getDocEditQuery() {
    if(this.doc){
      this.idDocument = this.doc.id;
      this.docEditQuery = new DocEditQuery(this.getToken(this.nameCookie), this.idDocument);
    }
  }

  onClickB() {
    this.docEditQuery = this.doc;
  }

  removeZeros() {
    if(this.docEdit) {
      if(this.docEdit.docStatus === 'проведен')
        this.isHeld = true;
      else this.isHeld = false;
      this.addIdAndZeroDescriptRow();
      if(this.docEdit.docDate.includes(' ')) {
        var splitedPayDate = this.docEdit.docDate.split(' ');
        this.docEdit.docDate = splitedPayDate[0];
      }
      if(this.docEdit.docBody.length > 0) {
        this.docEdit.docBody.forEach(element => {
          var splitedPayDate = element[3].split(' ');
          element[3] = splitedPayDate[0];
        });
    }}
  }

  addIdAndZeroDescriptRow() {
    let i = 0;
    this.docEdit.docBody.forEach(element => {
      element[2] = parseFloat(element[2].replace(/\s/g, "").replace(",", "."));
      element[4] = parseFloat(element[4].replace(/\s/g, "").replace(",", "."));
      element[5] = parseFloat(element[5].replace(/\s/g, "").replace(",", "."));
      element[6] = element[6].replace(/\s/g, "").replace(",", ".");
      element[10] = (i++).toString();
      element[11] = 'white';
      if(element[2] < 0 && element[2] > -500)
        element[11] = 'yellow';
      if(element[2] < -500)
        element[11] = 'red';
    });
  }

  onOpenPartnerDialog(): void {
    this.saveDocument('provider');
  }
    
  openPartnerDialog(): void {
    const dialogRef = this.dialog.open(PartnerListComponent, {
      width: '880px',
      height: '680px',
      data: {list: this.getProviders()},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.postlistPartners(result);
      }
    });
  }

  openOrderDialog(provider: string, idrow: string): void {
    const dialogRef = this.dialog.open(OrderListComponent, {
      width: '600px',
      height: '500px',
      data: { token: this.token, provider: provider },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.docEdit.docBody.find(x => x[10] === idrow)[9] = result;
      }
    });
  }

  openSaveDialog(docNum: string): void {
    if(docNum === this.docEdit.docNum) {
      const dialogRef = this.dialog.open(SaveFormComponent, {
        width: '400px',
        height: '300px',
        data: {doc: this.docEdit, token: this.token},
      });
      dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
    }
  }

  openDetailView(inn: string, provider: string) {
    const dialogRef = this.dialog.open(DetailPartnerFormComponent, {
      width: '1050px',
      data: {token: this.token, inn: inn, provider: provider},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      }
    });
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

  postlistPartners(data) {
    let partnerQuery = new SaveProvider(this.token, this.doc.id, data);
    this.workService.postlistPartners(partnerQuery).subscribe(response =>  { 
      this.docEdit = response; 
      this.removeZeros(); 
    });
  }

  getProviders() {
    let list = [];
    if(this.docEdit.docBody.length > 0) {
      this.docEdit.docBody.forEach(element => { list.push(element[0]); });}
    return list;
  }

  onDelete(docNum: string) {
    let model = new DeleteDoc(this.token, docNum);
      this.workService.postDeleteDocument(model).subscribe(response => { 
        this.status = response; 
        this.checkStatus(this.status);
      },
        error => { 
          console.log(error);
          alert('Потеряна связь с сервером'); 
        }
      );
  }

  checkStatus(status: Status) {
    if(status.status === 'true') 
      this.router.navigate(['/search']);
    else 
      this.openAttentionDialog(status.status, null);
  }

  openAttentionDialog(status: string, message: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      data: {status: status, message: message},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  openImportDialog() {
    const dialogRef = this.dialog.open(ImportFormComponent, {
      width: '600px',
      data: { token: this.token, docNum: this.docEdit.docNum },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.ngOnInit();
    });
  }

  saveDocument(action) {
    let docSave = new SaveDocQuery(this.token, this.docEdit.docNum, this.docEdit.docName, this.docEdit.docStatus, this.docEdit.docBody);
    this.workService.postSaveDocument(docSave).subscribe(response => {
      if(response) {
        this.status = response; 
        this.checkDoc(action, this.status) 
      }},
      error => console.log(error)
    );
  }

  checkDoc(action, data) {
    if(data.status == 'true') {
      if(action === 'deletrow') 
        console.log("deletr row ok");
      if(action === 'provider') 
        this.openPartnerDialog();
    }  
    else {
      this.ngOnInit();
      this.openAttentionDialog(data.status, null);
    }
    
  }

  deleteItem(idrow: string) {
    let item = this.docEdit.docBody.find(x => x[10] === idrow);
    const index = this.docEdit.docBody.indexOf(item, 0);
    if (index > -1) {
      this.docEdit.docBody.splice(index, 1);
    }
    this.saveDocument('deletrow');
  }

  postFileMethod(event) {
    let files = event.target.files;
    if(files.length > 0) {
      let formData = new FormData(); 
      for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name);
      }
      formData.append("PayOne", JSON.stringify(new PayOne(this.token, this.docEdit.docNum)));
      console.log(formData.getAll('file'));
      console.log(formData.getAll('PayOne'));
      this.workService.postFileExcel(formData).subscribe(response => {
        if(response) {
          if(this.checkResponse(response))
            this.ngOnInit();
        } 
        else {
          console.log(response);
          this.openAttentionDialog(response, null);
        }
      }, error => console.log(error));  
    }
  }  

  checkResponse(response) {
    if(response.status === 'error') {
      console.log(response.status);
      this.openAttentionDialog(response.status, null);
      return false;
    }
    else return true;
  }

  onExportOneC() {
    let data = new OneCExp(this.token, this.docEdit.docNum);
    this.workService.postOneCExp(data).subscribe(response => {
      if(response) {
        if(this.checkResponse(response)) {
          this.openAttentionDialog('message', 'Ведется подготовка документа. Файл можно скачать в ');
        }
      } 
      else {
        console.log(response);
        this.openAttentionDialog(response, null);
      }
    }, error => {
        console.log(error); 
        alert('Нет соединения с сервером');
    }); 
  }

  onExportPint() {
    let data = new PrintQuery(this.token, this.docEdit.docNum);
    this.workService.postPrintExp(data).subscribe(response => {
      if(response) {
        if(this.checkResponse(response)) {
          this.openAttentionDialog('message', 'Ведется подготовка документа. Файл можно скачать в ');
        }
      } 
      else {
        console.log(response);
        this.openAttentionDialog(response, null);
      }
    }, error => {
        console.log(error); 
        alert('Нет соединения с сервером');
    }); 
  }
}