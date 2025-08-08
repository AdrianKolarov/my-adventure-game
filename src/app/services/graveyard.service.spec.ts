import { TestBed } from '@angular/core/testing';

import { GraveyardService } from './graveyard.service';

describe('GraveyardService', () => {
  let service: GraveyardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraveyardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
