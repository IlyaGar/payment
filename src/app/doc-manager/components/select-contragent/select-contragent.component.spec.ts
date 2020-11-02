import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContragentComponent } from './select-contragent.component';

describe('SelectContragentComponent', () => {
  let component: SelectContragentComponent;
  let fixture: ComponentFixture<SelectContragentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContragentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContragentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
