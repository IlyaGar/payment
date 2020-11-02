import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTabsComponent } from './doc-tabs.component';

describe('DocTabsComponent', () => {
  let component: DocTabsComponent;
  let fixture: ComponentFixture<DocTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
