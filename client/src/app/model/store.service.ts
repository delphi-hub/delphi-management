import {Injectable} from '@angular/core';
import {Instance} from './models/instance';
import {BehaviorSubject, Observable} from 'rxjs';
import { InfoCenterItem } from '../dashboard/info-center/info-center-datasource';

export enum Actions {
  ADD = 'ADD',
  DELETE = 'DELETE',
  CHANGE = 'CHANGE',
  NONE = 'NONE'
}
export interface State {
  instances: { [id: number]: Instance };
  instancesByType: { [compType: string]: Array<number> };
  events: { [id: number]: InfoCenterItem };
}
export interface StateUpdate {
  state: State;
  change: Change;
}
export interface Change {
  type: Actions;
  elements?: Array<Instance>;
}

export const EMPTY_STATE = {instances: {}, instancesByType: {'Crawler': [], 'WebApi': [], 'WebApp': [], 'ElasticSearch': []}, events: {}};

/**
 * This service is used to manage the shared state used in the whole application.
 * Changes to the managed state can be made through the methods corresponding to the
 * actions described in the Actions enum.
 */
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly stateUpdateSubject: BehaviorSubject<StateUpdate>;

  /**
   * Adds the given @param instance to the @param state.
   * Any previous entry for the given instance is overwritten by this method.
   */
  private static addNewInstanceToState(state: State, instance: Instance) {
    state.instances[instance.id] = instance;
    const instancesByType = state.instancesByType[instance.componentType];
    // TODO: check if state actually is updated if variable is used
    if (!instancesByType.includes(instance.id)) {
      instancesByType.push(instance.id);
    }
    return state;
  }

  /**
   * Removes the given @param instance from the @param state
   * and @returns the new state
   */
  private static removeInstanceFromState(state: State, instance: Instance) {
    delete state.instances[instance.id];
    state.instancesByType[instance.componentType] = state.instancesByType[instance.componentType].filter(e => e !== instance.id);

    return state;
  }

  /**
   * This method iterates the given @param instances and compares them
   * to the @param currentState. If the instances would result in the same
   * state the method @returns false.
   */
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

  /**
   * Retruns an observable which notifies the subscriber about any changes to the state.
   */
  public getStoreObservable(): Observable<StateUpdate> {
    return this.stateUpdateSubject.asObservable();
  }

  /**
   * Returns the current state.
   */
  public getState() {
    return this.stateUpdateSubject.value.state;
  }

  /**
   * Adds the given @param instances to the state.
   * If @param calculateDiff is true the state is only updated after a diff is calculated
   * in order to permit unecessary state changes.
   */
  public addInstancesToState(instances: Array<Instance>, calculateDiff= false) {

    const newState: State = instances.reduce((accumulator: State, currentValue: Instance) => {
      return StoreService.addNewInstanceToState(accumulator, currentValue);
    }, EMPTY_STATE);

    const changed = calculateDiff ? StoreService.stateHasChanged(this.stateUpdateSubject.value.state, instances) : true;

    if (changed) {
      this.stateUpdateSubject.next({state: newState, change: {type: Actions.ADD, elements: instances}});
    }
  }

  /**
   * Adds the given @param instance to the state.
   */
  public addInstanceToState(instance: Instance) {
    const newState = StoreService.addNewInstanceToState(this.stateUpdateSubject.value.state, instance);
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.ADD, elements: [instance]}});
  }

  /**
   * Updates the given @param instance in the state.
   * The update is performed by overwriting the previously stored instance.
   */
  public changeInstancesState(instances: Array<Instance>) {
    let newState: State;
    for (const instance of instances) {
       newState = StoreService.addNewInstanceToState(this.stateUpdateSubject.value.state, instance);
    }
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.CHANGE, elements: instances}});
  }

  /**
   * Removes the given @param instance from the state.
   */
  public removeFromState(instance: Instance) {
    const newState = StoreService.removeInstanceFromState(this.stateUpdateSubject.value.state, instance);
    // maybe calculate diff before
    this.stateUpdateSubject.next({state: newState, change: {type: Actions.DELETE, elements: [instance]}});
  }

}
