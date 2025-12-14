import { TestBed } from '@angular/core/testing';

import { ListviewService } from './listview.service';

describe('ListviewService', () => {
  let service: ListviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
