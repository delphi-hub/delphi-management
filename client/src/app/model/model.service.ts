import {Injectable} from '@angular/core';
import {SocketService} from '../api/api/socket.service';
import {ApiService} from '../api/api/api.service';
import {Instance} from './models/instance';

import {EventTypeEnum} from './models/socketMessage';
import {StoreService} from './store.service';


@Injectable({
  providedIn: 'root'
})
export class ModelService {


  constructor(private socketService: SocketService, private apiService: ApiService, private storeService: StoreService) {

  }

  public initInstances() {
    // get current instances and update the current state
    this.apiService.getInstanceNetwork().subscribe((network: Array<Instance>) => {
      // parse network to state and update after diff
      this.storeService.addToState(network);
    }, (error) => {
      console.log('get network error', error);
    });
    // register for event updates
    this.socketService.subscribeForEvent(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      this.storeService.addToState(newInstance);
    });

    this.socketService.subscribeForEvent(EventTypeEnum.InstanceRemovedEvent).subscribe((removedInstance: Instance) => {
      this.storeService.removeFromState(removedInstance);
    });
  }

  public subscribeForInstances() {

  }

  public subscribeForCrawler() {

  }

  public subscribeForWebApp() {
  }

  public subscribeForWebApi() {

  }
}
