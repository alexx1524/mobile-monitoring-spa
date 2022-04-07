import { TestBed } from '@angular/core/testing';

import { GetConfigApiService } from './get-config-api.service';

describe('GetConfigApiService', () => {
  let service: GetConfigApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConfigApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
