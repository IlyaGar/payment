import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LictDocumentsComponent } from './lict-documents.component';

describe('LictDocumentsComponent', () => {
  let component: LictDocumentsComponent;
  let fixture: ComponentFixture<LictDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LictDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LictDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
