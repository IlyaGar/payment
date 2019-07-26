import { TestBed } from '@angular/core/testing';

import { ListDocumentsService } from './list-documents.service';

describe('ListDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListDocumentsService = TestBed.get(ListDocumentsService);
    expect(service).toBeTruthy();
  });
});
