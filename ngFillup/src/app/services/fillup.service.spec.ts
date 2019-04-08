import { TestBed } from '@angular/core/testing';

import { FillupService } from './fillup.service';

describe('FillupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FillupService = TestBed.get(FillupService);
    expect(service).toBeTruthy();
  });
});
