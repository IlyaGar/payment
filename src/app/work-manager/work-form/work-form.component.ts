import { Component, OnInit } from '@angular/core';
import { PartnerListComponent } from '../../partner-manager/partner-list/partner-list.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderListComponent } from '../../order-manager/order-list/order-list.component';
import { DocEditQuery } from 'src/app/models/doc-edit-query';
import { ActivatedRoute, Router} from '@angular/router';
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
import { delay } from 'q';

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

  listData: Array<string> = ['provider', '1001', 'saldo', '2019.06.05', '21', 'no', '123456', 'lalala', '1234', '987, 1, 2'];
  listlistData: Array<Array<string>> = [this.listData];
  docEditTest: DocEdit = new DocEdit("true", "22", "test-name", "2019-05-06", "2236", "Черновик", this.listlistData);

  constructor(
    public dialog: MatDialog,
    private workService: WorkService,
    private cookieService: CookieService,
    private router: Router,
    private activateRoute: ActivatedRoute
    ) {
        activateRoute.params.subscribe(params => { this.doc = params; this.getDocEditQuery(); });
      }

  ngOnInit() {
    if(this.idDocument) {
      this.workService.postGetDocument(this.docEditQuery).subscribe(d =>  { this.docEdit = d; this.addIdRow(); this.removeZeros(); });
      this.token = this.getToken(this.nameCookie);
    }

    /*this.token = this.getToken(this.nameCookie);
    this.docEdit = this.docEditTest;*/
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
      //TypeError: Cannot read property 'includes' of undefined
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

  addIdRow() {
    let i = 0;
    this.docEdit.docBody.forEach(element => {
      element[10] = (i++).toString();
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
      this.docEdit.docBody.find(x => x[10] === idrow)[9] = result;
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

  openDetailView(provider: string) {
    const dialogRef = this.dialog.open(DetailPartnerFormComponent, {
      width: '1000px',
      height: '800px',
      data: {provider: provider},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let e = 9;
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
    this.workService.postlistPartners(partnerQuery).subscribe(d =>  { this.docEdit = d; this.removeZeros(); });
  }

  getProviders() {
    let list = [];
    if(this.docEdit.docBody.length > 0) {
      this.docEdit.docBody.forEach(element => { list.push(element[0]); });}
    return list;
  }

  onDelete(docNum: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: 'delete'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let model = new DeleteDoc(this.token, docNum);
        this.workService.postDeleteDocument(model).subscribe(s => { this.status = s; this.checkStatus(this.status ); }); }
    });
  }

  checkStatus(status: Status) {
    if(status.status === 'true') 
      this.router.navigate(['/search']);
    else 
      this.openAttentionDialog(status.status);
  }

  openAttentionDialog(status: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: status},
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  saveDocument(action) {
    let docSave = new SaveDocQuery(this.token, this.docEdit.docNum, this.docEdit.docName, this.docEdit.docStatus, this.docEdit.docBody);
    this.workService.postSaveDocument(docSave).subscribe(d => {this.status = d; this.checkDoc(action, this.status);},
      error => console.log(error));
  }

  checkDoc(action, data) {
    if(data.status == 'true') {
      if(action === 'deletrow') 
        console.log("deletr row ok");
      if(action === 'provider') 
        this.openPartnerDialog();
    }  
    else 
      this.openAttentionDialog(data.status);
  }

  deleteItem(idrow: string) {
    const dialogRef = this.dialog.open(AttentionFormComponent, {
      width: '400px',
      height: '200px',
      data: {status: 'delete'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let item = this.docEdit.docBody.find(x => x[10] === idrow);
        const index = this.docEdit.docBody.indexOf(item, 0);
        if (index > -1) {
          this.docEdit.docBody.splice(index, 1);
        }
        this.saveDocument('deletrow'); }
    });
  }

  async onReport(docNum){
    await delay(10000);
    let vaaa = 5;
    this.openSaveDialog(docNum);
  }

  postMethod(files: FileList) {
    this.fileToUpload = files.item(0); 
    let formData = new FormData(); 
    for(let i = 0; i < files.length; i++){
      formData.append('file', files[i], files[i].name);
    }
    this.workService.postFile1C(formData).subscribe((val) => {   
      this.checkFile(val);
      console.log(val);
    });
  }

  checkFile(val) {
    let e = 9;
  }
}