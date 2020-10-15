import { TestBed } from '@angular/core/testing';

import { Check.LoginService } from './check.login.service';

describe('Check.LoginService', () => {
  let service: Check.LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Check.LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
