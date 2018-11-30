import {Injectable} from '@angular/core';
import {SocketService} from '../api/api/socket.service';
import {ApiService} from '../api/api/api.service';
import {ComponentType, Instance} from './models/instance';

import {EventTypeEnum} from './models/socketMessage';
import {StateUpdate, StoreService} from './store.service';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private readonly instanceSubject: BehaviorSubject<Array<Instance>>;
  private readonly instanceIdSubjects: {[compType: string]: BehaviorSubject<Array<number>>};
  private readonly instanceSubjects: {[compType: string]: BehaviorSubject<Array<Instance>>};

  constructor(private socketService: SocketService, private apiService: ApiService, private storeService: StoreService) {
    this.instanceSubject = new BehaviorSubject<Array<Instance>>([]);

    this.instanceIdSubjects = {
      'Crawler': new BehaviorSubject<Array<number>>([]),
      'WebApp': new BehaviorSubject<Array<number>>([]), 'WebApi': new BehaviorSubject<Array<number>>([])
    };

    this.instanceSubjects = {
      'Crawler': new BehaviorSubject<Array<Instance>>([]),
      'WebApp': new BehaviorSubject<Array<Instance>>([]), 'WebApi': new BehaviorSubject<Array<Instance>>([])
    };

    this.storeService.getStoreObservable().subscribe((state: StateUpdate) => {

      // const changedCompTypes = [];
      // state.change.elements.forEach((changedInstance) => {
      //   const compType = changedInstance.componentType;
      //   if (!compType in changedCompTypes) {
      //     changedCompTypes.push(compType);
      //   }
      //   if (changedCompTypes.length === 3) {
      //     return;
      //   }
      // });
      //
      // changedCompTypes.forEach((compType) => {
      //   this.instanceIdSubjects[compType].next(state.state.instancesByType[compType]);
      //   const comps: Array<Instance> = [];
      //   state.state.instancesByType[compType].forEach((id) => {
      //     comps.push(state.state.instances[id]);
      //   });
      //   this.instanceSubjects[compType].next(comps);
      // });

      this.instanceSubject.next(state.change.elements);
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
  }

  public getObservableForInstances() {
    return new Observable<Array<Instance>>((observer) => {
      this.instanceSubject.subscribe(observer);
      observer.next(this.instanceSubject.value);

      return () => {
        // TODO: see console log
        console.log('observer completed, implement unsubscribe logic !');
      };
    });
  }

  public getObservableForComps(compType: ComponentType) {
    return new Observable<Array<Instance>>((observer) => {
      const compSubject = this.instanceSubjects[compType];
      compSubject.subscribe(observer);
      observer.next(compSubject.value);

      return () => {
        // TODO: see console log
        console.log('observer completed, implement unsubscribe logic !');
      };
    });
  }

  public getObservableForCompIds(compType: ComponentType) {
    return new Observable<Array<number>>((observer) => {
      const compSubject = this.instanceIdSubjects[compType];
      compSubject.subscribe(observer);
      observer.next(compSubject.value);

      return () => {
        // TODO: see console log
        console.log('observer completed, implement unsubscribe logic !');
      };
    });
  }
}
