import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRowManagerComponent } from './input-row-manager.component';

describe('InputRowManagerComponent', () => {
  let component: InputRowManagerComponent;
  let fixture: ComponentFixture<InputRowManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRowManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRowManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
