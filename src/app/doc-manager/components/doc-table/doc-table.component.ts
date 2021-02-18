import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { EditRowManagerComponent } from '../../dialog-windows/edit-row-manager/edit-row-manager.component';
import { EditRowOfficeComponent } from '../../dialog-windows/edit-row-office/edit-row-office.component';
import { HistoryDogovorDialogComponent } from '../../dialog-windows/history-dogovor-dialog/history-dogovor-dialog.component';
import { NewRowManagerComponent } from '../../dialog-windows/new-row-manager/new-row-manager.component';
import { SelectContragentDialogComponent } from '../../dialog-windows/select-contragent-dialog/select-contragent-dialog.component';
import { GetDogovorHistory } from '../../models/doc-history';
import { GetListOfDogovor } from '../../models/doc-list';
import { AddDogovorByRukovod } from '../../models/doc-ruc';
import { EditDogovorByRukovod } from '../../models/doc-ruc-edit';
import { EditDogovorByOffice } from '../../models/doc-secretary';
import { RowDogovor } from '../../models/row-dogowor';
import { DocService } from '../../service/doc.service';

@Component({
  selector: 'app-doc-table',
  templateUrl: './doc-table.component.html',
  styleUrls: ['./doc-table.component.scss']
})
export class DocTableComponent implements OnInit {

  // @Input() data: StartData;
  @Input() group: string;
  @Input() index: string;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['contragent', 'ndogovor', 'date_start', 'date_end', 'summa', 'date_post', 'date_get', 'file_link', 'action'];
  dataList: Array<RowDogovor> = [];
  dataSourceList: any;
  
  isLoading: boolean = false;
  cancelClicked: boolean = false;
  date_from: Date;
  date_to: Date;
  nameCookie = 'user';
  searchedContragent: string = '';
  positionHead = 'руководитель';
  positionOffice = 'секретарь';
  
  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private docService: DocService,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.loadListOfDogovor('','','','',40,'','');
  }

  loadListOfDogovor(key: string, date_from: string, date_to: string, contragent: string, current: number, column: string, order_type: string) : void {
    let data = new GetListOfDogovor(this.getToken(this.nameCookie), +this.index, key, date_from, date_to, contragent, current, column, order_type);
    this.docService.getListOfDogovor(data).subscribe(response => {
      if(response) {
        this.dataList = response;
      }
    },
    error => { 
      console.log(error);
    });
  }

  onSearch(): void {
    this.loadListOfDogovor('', 
      this.datePipe.transform(this.date_from,"dd.MM.yyyy") ? this.datePipe.transform(this.date_from,"dd.MM.yyyy") : '', 
      this.datePipe.transform(this.date_to,"dd.MM.yyyy") ? this.datePipe.transform(this.date_to,"dd.MM.yyyy") : '',
      this.searchedContragent,
      40,
      '',
      ''
    );
  }

  onClear(): void {
    this.searchedContragent = '';
    this.date_from = null;
    this.date_to = null;
    this.loadListOfDogovor('','','','',40,'','');
  }

  onOpenNewRow(): void {
    this.openNewRowManager(new AddDogovorByRukovod(this.getToken(this.nameCookie), +this.index, '', '', '', '', '', ''));
  }

  openNewRowManager(dataAddDogovorByRukovod: AddDogovorByRukovod): void {
    const dialogRef = this.dialog.open(NewRowManagerComponent, {
      disableClose: true,
      width: "860px",
      data: { addDogovorByRukovod: dataAddDogovorByRukovod },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.docService.postDogovor(result).subscribe(response => {
          if(response.status === 'true') {
            // alert("Договор добавлен.");
            // if(this.searchedContragent === dataAddDogovorByRukovod.contragent)
            //   this.searchedContragent = dataAddDogovorByRukovod.contragent;
            // else this.searchedContragent;
            this.loadListOfDogovor('','','', this.searchedContragent === dataAddDogovorByRukovod.contragent ? this.searchedContragent : this.searchedContragent = '', 40,'','');
          }
          if(response.status === 'access denied') {
            alert("Доступ закрыт.");
          }
        },
        error => { 
          console.log(error);
          alert("Сервер не отвечает.");
        });
      }
    });
  }

  onOpenEditorManager(dataRowDogovor: RowDogovor): void {
    let editDogovorByRukovod = new EditDogovorByRukovod(
      this.getToken(this.nameCookie),
      dataRowDogovor.contragent,
      +this.index,
      dataRowDogovor.date_start,
      dataRowDogovor.date_end,
      dataRowDogovor.summa,
      dataRowDogovor.summa_type,
      dataRowDogovor.date_post,
      dataRowDogovor.key
      )
    const dialogRef = this.dialog.open(EditRowManagerComponent, {
      disableClose: true,
      width: "860px",
      data: { editDogovorByRukovod: editDogovorByRukovod },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.docService.editDogovorRukov(result).subscribe(response => {
          if(response.status === 'true') {
            // alert("Договор измененн.");
            this.loadListOfDogovor('','','', this.searchedContragent, 40,'','');
          }
          if(response.status === 'access denied') {
            alert("Доступ закрыт.");
          }
        },
        error => { 
          console.log(error);
          alert("Сервер не отвечает.");
        });
      }
    });
  }
  

  onOpenEditorOffic(dataRowDogovor: RowDogovor): void {
    let editDogovorByOffice = new EditDogovorByOffice(
      this.getToken(this.nameCookie),
      +this.index,
      dataRowDogovor.key,
      dataRowDogovor.date_get,
      dataRowDogovor.file_link
    )
    const dialogRef = this.dialog.open(EditRowOfficeComponent, {
      disableClose: true,
      width: "640px",
      data: { editDogovorByOffice: editDogovorByOffice },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.docService.editDogovorOffice(result).subscribe(response => {
          if(response.status === 'true') {
            this.loadListOfDogovor('','','', this.searchedContragent, 40,'','');
          }
          if(response.status === 'access denied') {
            alert("Доступ закрыт.");
          }
        },
        error => { 
          console.log(error);
          alert("Сервер не отвечает.");
        });  
      }
    });
  }

  sortData(sort: Sort): void {
    this.loadListOfDogovor('', 
    this.datePipe.transform(this.date_from,"dd.MM.yyyy") ? this.datePipe.transform(this.date_from,"dd.MM.yyyy") : '', 
    this.datePipe.transform(this.date_to,"dd.MM.yyyy") ? this.datePipe.transform(this.date_to,"dd.MM.yyyy") : '',
      this.searchedContragent ? this.searchedContragent  : '',
      40,
      sort.active,
      sort.direction
    );
  }

  getToken(nameCookie: string): string {
    if(this.cookieService.check(nameCookie)) {
      let fullData = this.cookieService.get(nameCookie);
      let loginFromCookie = JSON.parse(fullData);
      if(loginFromCookie) {
        return loginFromCookie.token
      }
    }
    else return '';
  }

  onOpenSelectContragentDialog(): void {
    const dialogRef = this.dialog.open(SelectContragentDialogComponent, {
      // disableClose: true,
      width: "470px",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.searchedContragent = result;
      }
    });
  }
  
  onOpenHistory(element: RowDogovor): void {
    const dialogRef = this.dialog.open(HistoryDogovorDialogComponent, {
      // disableClose: true,
      // width: "470px",
      data: { history: new GetDogovorHistory(this.getToken(this.nameCookie), element.key) }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.searchedContragent = result;
      }
    });
  }
}
