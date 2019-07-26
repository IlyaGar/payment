import { TestBed } from '@angular/core/testing';

import { SaldoService } from './saldo.service';

describe('SaldoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaldoService = TestBed.get(SaldoService);
    expect(service).toBeTruthy();
  });
});
