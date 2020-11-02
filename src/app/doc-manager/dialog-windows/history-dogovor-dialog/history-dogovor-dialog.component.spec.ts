import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDogovorDialogComponent } from './history-dogovor-dialog.component';

describe('HistoryDogovorDialogComponent', () => {
  let component: HistoryDogovorDialogComponent;
  let fixture: ComponentFixture<HistoryDogovorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDogovorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDogovorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
