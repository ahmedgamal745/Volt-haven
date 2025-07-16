import { TestBed } from '@angular/core/testing';

import { ErorrMessageService } from './erorr-message.service';

describe('ErorrMessageService', () => {
  let service: ErorrMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErorrMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
