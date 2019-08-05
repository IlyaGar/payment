import { TestBed } from '@angular/core/testing';

import { DetailPartnerService } from './detail-partner.service';

describe('DetailPartnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailPartnerService = TestBed.get(DetailPartnerService);
    expect(service).toBeTruthy();
  });
});
