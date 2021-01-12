import { TestBed } from '@angular/core/testing';

import { viacleService } from './car.service';

describe('CarService', () => {
  let service: viacleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(viacleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
