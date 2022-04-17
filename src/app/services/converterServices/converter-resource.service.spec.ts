import { TestBed } from '@angular/core/testing';

import { ConverterResourceService } from './converter-resource.service';

describe('ConverterResourceService', () => {
  let service: ConverterResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
