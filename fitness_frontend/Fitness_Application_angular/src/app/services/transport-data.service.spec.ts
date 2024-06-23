import { TestBed } from '@angular/core/testing';

import { TransportDataService } from './transport-data.service';

describe('TransportDataService', () => {
  let service: TransportDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
