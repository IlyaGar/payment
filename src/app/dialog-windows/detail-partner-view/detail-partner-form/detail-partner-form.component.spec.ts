import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPartnerFormComponent } from './detail-partner-form.component';

describe('DetailPartnerFormComponent', () => {
  let component: DetailPartnerFormComponent;
  let fixture: ComponentFixture<DetailPartnerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPartnerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPartnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
