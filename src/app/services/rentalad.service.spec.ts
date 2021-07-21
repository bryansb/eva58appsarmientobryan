import { TestBed } from '@angular/core/testing';

import { RentaladService } from './rentalad.service';

describe('RentaladService', () => {
  let service: RentaladService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentaladService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
