import { TestBed } from '@angular/core/testing';

import { ArchiveDocService } from './archive-doc.service';

describe('ArchiveDocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchiveDocService = TestBed.get(ArchiveDocService);
    expect(service).toBeTruthy();
  });
});
