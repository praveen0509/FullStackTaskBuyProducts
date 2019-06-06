import { TestBed } from '@angular/core/testing';

import { DatabasedataService } from './databasedata.service';
// @ts-ignore
import {beforeEach, describe, it, expect} from 'jasmine';

describe('DatabasedataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabasedataService = TestBed.get(DatabasedataService);
    expect(service).toBeTruthy();
  });
});
