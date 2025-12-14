import { TestBed } from '@angular/core/testing';

import { AppReloadService } from './app-reload.service';

describe('AppReloadService', () => {
  let service: AppReloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppReloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
