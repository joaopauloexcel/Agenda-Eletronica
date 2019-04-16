import { TestBed } from '@angular/core/testing';

import { ContatoSharedService } from './contato-shared.service';

describe('ContatoSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContatoSharedService = TestBed.get(ContatoSharedService);
    expect(service).toBeTruthy();
  });
});
