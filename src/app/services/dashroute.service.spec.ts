import { TestBed, inject } from '@angular/core/testing';

import { DashrouteService } from './dashroute.service';

describe('DashrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashrouteService]
    });
  });

  it('should be created', inject([DashrouteService], (service: DashrouteService) => {
    expect(service).toBeTruthy();
  }));
});
