import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContragentDialogComponent } from './select-contragent-dialog.component';

describe('SelectContragentDialogComponent', () => {
  let component: SelectContragentDialogComponent;
  let fixture: ComponentFixture<SelectContragentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContragentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContragentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
