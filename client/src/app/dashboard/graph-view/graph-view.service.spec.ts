import {TestBed} from '@angular/core/testing';

import {GraphViewService} from './graph-view.service';

describe('GraphViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphViewService = TestBed.get(GraphViewService);
    expect(service).toBeTruthy();
  });
});
