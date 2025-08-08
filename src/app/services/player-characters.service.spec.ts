import { TestBed } from '@angular/core/testing';

import { PlayerCharactersService } from './player-characters.service';

describe('PlayerCharactersService', () => {
  let service: PlayerCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
