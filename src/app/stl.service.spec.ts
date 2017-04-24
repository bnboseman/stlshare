import { TestBed, inject } from '@angular/core/testing';

import { StlService } from './stl.service';

describe('StlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StlService]
    });
  });

  it('should ...', inject([StlService], (service: StlService) => {
    expect(service).toBeTruthy();
  }));
});
