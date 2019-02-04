import {TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {GraphViewService} from './graph-view.service';

describe('GraphViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [GraphViewService]
  }));

  it('should be created', () => {
    const service: GraphViewService = TestBed.get(GraphViewService);
    expect(service).toBeTruthy();
  });
});
