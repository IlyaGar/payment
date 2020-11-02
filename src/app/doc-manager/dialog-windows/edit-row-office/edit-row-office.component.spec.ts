import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRowOfficeComponent } from './edit-row-office.component';

describe('EditRowOfficeComponent', () => {
  let component: EditRowOfficeComponent;
  let fixture: ComponentFixture<EditRowOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRowOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRowOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
