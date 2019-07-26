import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoFormComponent } from './saldo-form.component';

describe('SaldoFormComponent', () => {
  let component: SaldoFormComponent;
  let fixture: ComponentFixture<SaldoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
