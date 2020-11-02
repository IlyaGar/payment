import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRowManagerComponent } from './edit-row-manager.component';

describe('EditRowManagerComponent', () => {
  let component: EditRowManagerComponent;
  let fixture: ComponentFixture<EditRowManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRowManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRowManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
