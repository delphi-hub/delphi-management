import {Injectable} from '@angular/core';
import {Instance} from './models/instance';
import {BehaviorSubject, Observable} from 'rxjs';

export enum Actions {
  ADD = 'ADD',
  DELETE = 'DELETE',
  CHANGE = 'CHANGE',
  NONE = 'NONE'
}
export interface State {
  instances: { [id: number]: Instance };
  instancesByType: { [compType: string]: Array<number> };
}
export interface StateUpdate {
  state: State;
  change: Change;
}
export interface Change {
  type: Actions;
  elements?: Array<Instance>;
}

export const EMPTY_STATE = {instances: {}, instancesByType: {'Crawler': [], 'WebApi': [], 'WebApp': [], 'ElasticSearch': []}};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly stateUpdateSubject: BehaviorSubject<StateUpdate>;

  private static addNewInstanceToState(state: State, instance: Instance) {
    state.instances[instance.id] = instance;
    console.log('dding new instance to state', state, instance);
    state.instancesByType[instance.componentType].push(instance.id);
    return state;
  }

  private static removeInstanceFromState(state: State, instance: Instance) {
    delete state.instances[instance.id];
    state.instancesByType[instance.componentType] = state.instancesByType[instance.componentType].filter(e => e !== instance.id);

    return state;
  }

  private static stateHasChanged(currentState: State, instances: Array<Instance>) {
    const currentInstances = Object.values(currentState.instances);
    if (currentInstances.length === instances.length) {
      for (let i = 0; i < instances.length; i++) {
        const currentInstance = instances[i];
        const currentInstanceState = currentState.instances[currentInstance.id];
        if (currentInstanceState !== undefined) {
          if (currentInstanceState !== currentInstance) {
            return true;
          }
        } else {
          return true;
        }
      }
    } else {
      return true;
    }

    return false;
  }

  constructor() {
    this.stateUpdateSubject = new BehaviorSubject<StateUpdate>({state: EMPTY_STATE, change: {type: Actions.NONE}});
  }

  public getStoreObservable(): Observable<StateUpdate> {
    return new Observable ((observer) => {
      this.stateUpdateSubject.subscribe(observer);
      observer.next(this.stateUpdateSubject.value);
    });

  }

  public getState() {
    return this.stateUpdateSubject.value.state;
  }

  public addInstancesToState(instances: Array<Instance>, calculateDiff= false) {
    const newState: State = instances.reduce((accumulator: State, currentValue: Instance) => {
      return StoreService.addNewInstanceToState(accumulator, currentValue);
    }, EMPTY_STATE);

    const changed = calculateDiff ? StoreService.stateHasChanged(this.stateUpdateSubject.value.state, instances) : true;

    if (changed) {
      this.stateUpdateSubject.next({state: newState, change: {type: Actions.ADD, elements: instances}});
    }
  }

  public addInstanceToState(instance: Instance) {
    const newState = StoreService.addNewInstanceToState(this.stateUpdateSubject.value.state, instance);
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.ADD, elements: [instance]}});
  }

  public changeInstanceState(instance: Instance) {
    const newState = StoreService.addNewInstanceToState(this.stateUpdateSubject.value.state, instance);
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.CHANGE, elements: [instance]}});
  }

  public removeFromState(instance: Instance) {
    const newState = StoreService.removeInstanceFromState(this.stateUpdateSubject.value.state, instance);
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.DELETE, elements: [instance]}});
  }

}
