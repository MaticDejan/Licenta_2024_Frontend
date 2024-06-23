import { TestBed } from '@angular/core/testing';

import { TransportExercitiiService } from './transport-exercitii.service';

describe('TransportExercitiiService', () => {
  let service: TransportExercitiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportExercitiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
