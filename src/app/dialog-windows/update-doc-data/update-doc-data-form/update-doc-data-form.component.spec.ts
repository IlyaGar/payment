import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocDataFormComponent } from './update-doc-data-form.component';

describe('UpdateDocDataFormComponent', () => {
  let component: UpdateDocDataFormComponent;
  let fixture: ComponentFixture<UpdateDocDataFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDocDataFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
