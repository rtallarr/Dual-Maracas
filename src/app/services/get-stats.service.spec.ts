import { TestBed } from '@angular/core/testing';

import { GetStatsService } from './get-stats.service';

describe('GetStatsService', () => {
  let service: GetStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
