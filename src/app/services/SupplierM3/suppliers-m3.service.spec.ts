import { TestBed } from '@angular/core/testing';

import { SuppliersM3Service } from './suppliers-m3.service';

describe('SuppliersM3Service', () => {
  let service: SuppliersM3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuppliersM3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
