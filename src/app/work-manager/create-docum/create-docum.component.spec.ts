import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumComponent } from './create-docum.component';

describe('CreateDocumComponent', () => {
  let component: CreateDocumComponent;
  let fixture: ComponentFixture<CreateDocumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
