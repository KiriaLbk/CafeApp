import { TestBed } from '@angular/core/testing';

import { Form.ErrorsService } from './form.errors.service';

describe('Form.ErrorsService', () => {
  let service: Form.ErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Form.ErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
