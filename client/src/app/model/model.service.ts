import {Injectable} from '@angular/core';
import {SocketService} from '../api/api/socket.service';
import {ApiService} from '../api/api/api.service';
import {ComponentType, Instance, ComponentTypeEnum} from './models/instance';

import {EventTypeEnum} from './models/socketMessage';
import {StateUpdate, Change, StoreService, Actions} from './store.service';
import {BehaviorSubject, Observable} from 'rxjs';

export interface InstanceChange extends Change {
  allInstances?: { [id: number]: Instance };
}
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private readonly instanceSubject: BehaviorSubject<InstanceChange>;
  private readonly instanceSubjects: {[compType: string]: BehaviorSubject<Array<number>>};

  constructor(private socketService: SocketService, private apiService: ApiService, private storeService: StoreService) {
    this.instanceSubject = new BehaviorSubject<InstanceChange>({type: Actions.NONE});

    this.instanceSubjects = {
      'Crawler': new BehaviorSubject<Array<number>>([]),
      'WebApp': new BehaviorSubject<Array<number>>([]),
      'WebApi': new BehaviorSubject<Array<number>>([])
    };

    this.storeService.getStoreObservable().subscribe((state: StateUpdate) => {
      // if (state.change.elements) {

      //   const types: Array<ComponentType> = state.change.elements.reduce((accumulator, currentValue) => {
      //     const compType = currentValue.componentType;
      //     if (!accumulator.includes(compType)) {
      //       accumulator.push(compType);
      //     }
      //     return accumulator;
      //   }, []);
      //   types.forEach((type) => {
      //     this.instanceSubjects[type].next(state.state.instancesByType[type]);
      //   });
      // }
      this.instanceSubject.next({...state.change, allInstances: state.state.instances});
    });

    this.socketService.initSocket().then(() => {

      this.initInstances();


      setInterval(() => {
        this.updateAllInstances(true);
      }, 30000);
    });
  }

  private updateAllInstances(calculateDiff= false) {
    // get current instances and update the current state
    this.apiService.getInstanceNetwork().subscribe((network: Array<Instance>) => {
      console.log('received instacne response', network);
      // parse network to state and update after diff
      this.storeService.addInstancesToState(network, calculateDiff);
    }, (error) => {
      console.log('get network error', error);
    });
  }

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
   // this.socketService.subscribeForEvent<>(EventTypeEnum.LinkAddedEvent).subscribe(() => {});

    // this.socketService.subscribeForEvent<>(EventTypeEnum.LinkStateChangedEvent).subscribe(() => {});
  }

  public getObservableForInstances() {
    return new Observable<InstanceChange>((observer) => {
      this.instanceSubject.subscribe(observer);
      observer.next(this.instanceSubject.value);

      return () => {
        // TODO: see console log
        console.log('observer completed, implement unsubscribe logic !');
      };
    });
  }

  public getComponentsByType(compType: ComponentType) {
    const state = this.storeService.getState();
    return state.instancesByType[compType].map((id) => {
      return state.instances[id];
    });
  }

  // public getObservableForComps(compType: ComponentType) {
  //   return new Observable<Array<number>>((observer) => {
  //     const compSubject = this.instanceSubjects[compType];
  //     compSubject.subscribe(observer);
  //     observer.next(compSubject.value);

  //     return () => {
  //       // TODO: see console log
  //       console.log('observer completed, implement unsubscribe logic !');
  //     };
  //   });
  // }

}
