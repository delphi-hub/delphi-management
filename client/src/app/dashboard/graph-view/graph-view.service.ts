import {Injectable} from '@angular/core';
import {ModelService} from '../../model/model.service';

@Injectable({
  providedIn: 'root'
})
export class GraphViewService {

  constructor(private modelService: ModelService) {
  }
}
