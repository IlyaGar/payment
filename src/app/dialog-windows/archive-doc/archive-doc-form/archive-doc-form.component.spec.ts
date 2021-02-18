import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDocFormComponent } from './archive-doc-form.component';

describe('ArchiveDocFormComponent', () => {
  let component: ArchiveDocFormComponent;
  let fixture: ComponentFixture<ArchiveDocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveDocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveDocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
