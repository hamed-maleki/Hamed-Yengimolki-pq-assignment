import { TestBed } from '@angular/core/testing';

import { ObjectToArrayService } from './object-to-array.service';

describe('ObjectToArrayService', () => {
  let service: ObjectToArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectToArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
