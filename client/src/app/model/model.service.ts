import {Injectable} from '@angular/core';
import {SocketService} from '../api/api/socket.service';
import {ApiService} from '../api/api/api.service';
import {ComponentType, Instance } from './models/instance';

import {EventTypeEnum} from './models/socketMessage';
import {StateUpdate, Change, StoreService, Actions} from './store.service';
import {BehaviorSubject, Observable} from 'rxjs';
import { InstanceLinkPayload } from './models/instanceLink';

export interface InstanceChange extends Change {
  allInstances?: { [id: number]: Instance };
}

/**
 * This service is used to further abstract the acess to any data provided
 * by @class ApiService and @class SocketService.
 * The programmer should only interact with this class and the @class StoreService
 * in order to receive information about the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private readonly instanceSubject: BehaviorSubject<InstanceChange>;
  private readonly updateCycle = 30000;

  /**
   * Subscribes to state updates at the @class StoreService and notifies every subscriber of the this service if
   * a change to the store happens.
   * Also periodically queries the ApiService every 30000ms (set in the updateCycle variable) for updates.
   */
  constructor(private socketService: SocketService, private apiService: ApiService, private storeService: StoreService) {
    this.instanceSubject = new BehaviorSubject<InstanceChange>({type: Actions.NONE});

    this.storeService.getStoreObservable().subscribe((state: StateUpdate) => {
      this.instanceSubject.next({...state.change, allInstances: state.state.instances});
    });

    this.socketService.initSocket().then(() => {

      this.initInstances();

      setInterval(() => {
        this.updateAllInstances(true);
      }, this.updateCycle);
    });
  }

  /**
   * Used to query all network information from the api service.
   * Optionally a @param calculateDiff can be given to the @class StoreService
   * to calculate a diff between the old and new state before applying an update.
   */
  private updateAllInstances(calculateDiff= false) {
    // get current instances and update the current state
    this.apiService.getInstanceNetwork().subscribe((network: Array<Instance>) => {
      console.log('received instance response', network);
      // parse network to state and update after diff
      this.storeService.addInstancesToState(network, calculateDiff);
    }, (error) => {
      console.log('get network error', error);
    });
  }

  /**
   * Updates the state after receiving all instances from the api service.
   * Subscribes to InstanceAdded and InstanceRemoved Events at the socket service.
   */
  private initInstances() {
    this.updateAllInstances();
    // register for event updates
    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceAddedEvent).subscribe((newInstance: Instance) => {
      console.log('received instance added event', newInstance);
      this.storeService.addInstanceToState(newInstance);
    });

    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.InstanceRemovedEvent).subscribe((removedInstance: Instance) => {
      this.storeService.removeFromState(removedInstance);
    });
    // TODO: after interface changes in ir we will receive a tuple of instances which are now linked
    this.socketService.subscribeForEvent<InstanceLinkPayload>(EventTypeEnum.LinkAddedEvent).subscribe((data: InstanceLinkPayload) => {
      console.log('received link added', data);
      this.storeService.changeInstancesState([data.instanceFrom, data.instanceTo]);
    });


    this.socketService.subscribeForEvent<Instance>(EventTypeEnum.StateChangedEvent).subscribe((data: Instance) => {
      this.storeService.changeInstancesState([data]);
    });

    this.socketService.subscribeForEvent<InstanceLinkPayload>(EventTypeEnum.LinkStateChangedEvent).
      subscribe((data: InstanceLinkPayload) => {
        console.log('received link state changed', data);
        this.storeService.changeInstancesState([data.instanceFrom, data.instanceTo]);
      });
  }

  /**
   * Returns an observable, which notifies every subscriber about changes to the
   * instance stored in the state.
   */
  public getObservableForInstances() {
    return this.instanceSubject.asObservable();
  }

  /**
   * Returns all instances of the given @params compType.
   */
  public getComponentsByType(compType: ComponentType) {
    const state = this.storeService.getState();
    return state.instancesByType[compType].map((id) => {
      return state.instances[id];
    });
  }

}
