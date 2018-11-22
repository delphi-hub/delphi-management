import {Injectable} from '@angular/core';
import {Instance} from './models/instance';
import {BehaviorSubject} from 'rxjs';


export interface State {
  instances: { [id: number]: Instance };
  instancesByType: { [compType: string]: Array<number> };
}

export const EMPTY_STATE = {instances: {}, instancesByType: {'Crawler': [], 'WebApi': [], 'WebApp': []}};

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private stateSubject: BehaviorSubject<State>;

  private static addNewInstanceToState(state: State, instance: Instance) {
    state.instances[instance.id] = instance;
    state.instancesByType[instance.componentType].push(instance.id);
    return state;
  }

  private static removeInstanceFromState(state: State, instance: Instance) {
    delete state.instances[instance.id];
    state.instancesByType[instance.componentType] = state.instancesByType[instance.componentType].filter(e => e !== instance.id);

    return state;
  }

  constructor() {
    this.stateSubject = new BehaviorSubject<State>(EMPTY_STATE);
  }

  public getState() {
    return this.stateSubject.value;
  }

  public addToState(instances: Array<Instance>) {
    const newState: State = instances.reduce((accumulator: State, currentValue: Instance) => {
      return StoreService.addNewInstanceToState(accumulator, currentValue);
    }, EMPTY_STATE);
    // maybe calculate diff before
    this.stateSubject.next(newState);
  }

  public addToState(instance: Instance) {
    const newState = StoreService.addNewInstanceToState(this.stateSubject.getValue(), instance);
    // maybe calculate diff before
    this.stateSubject.next(newState);
  }

  public removeFromState(instance: Instance) {

  }


}
