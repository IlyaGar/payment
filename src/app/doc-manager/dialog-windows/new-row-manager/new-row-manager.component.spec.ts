import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRowManagerComponent } from './new-row-manager.component';

describe('NewRowManagerComponent', () => {
  let component: NewRowManagerComponent;
  let fixture: ComponentFixture<NewRowManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRowManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRowManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
