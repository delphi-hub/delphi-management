import { Injectable } from '@angular/core';
import { StoreService, StateUpdate, Actions } from './store.service';
import { BehaviorSubject } from 'rxjs';
import { InfoCenterItem } from '../dashboard/info-center/info-center-datasource';
import { Instance } from './models/instance';
import { DatePipe } from '@angular/common';


const ACTION_NOTIF_MAP = {
  'ADD': {type: 'add_circle', description: 'Instance Added'},
  'DELETE': {type: 'delete_sweep', description: 'Instance Deleted'},
  'CHANGE': {type: 'link', description: 'Instance Changed'},
};

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventState: BehaviorSubject<InfoCenterItem[]>;

  constructor(private storeService: StoreService) {
    this.eventState = new BehaviorSubject<InfoCenterItem[]>([]);

    this.storeService.getStoreObservable().subscribe((change: StateUpdate) => {
      // don't create an event for the intial state creation
      // all actions expect none have instances
      if (change.change.type !== Actions.NONE && change.change.elements) {
        const newNotifElements = change.change.elements.map((instance: Instance) => {
          const prevInstance = change.prevState.instances[instance.id];
          return this.transformEventToNotificaton(instance, prevInstance, change.change.type);
        });
        this.eventState.next([...newNotifElements, ...this.eventState.value]);
      }
    });
  }

  public getEventObservable() {
    return this.eventState.asObservable();
  }

  private transformEventToNotificaton(instance: Instance, prevInstance: Instance, action: Actions): InfoCenterItem {

    const details = this.getChange(instance, prevInstance, action);

    const datePipe = new DatePipe('en-US');
    const actualDate = datePipe.transform(Date.now(), 'dd/MM/yyyy hh:mm:ss:SSS');
    return {instanceId: instance.id, type: ACTION_NOTIF_MAP[action].type,
      notifName: ACTION_NOTIF_MAP[action].description, dateTime: actualDate, details: details};
  }

  private getChange(instance: Instance, prevInstance: Instance, action: Actions): string {
    if (prevInstance && action === Actions.CHANGE) {
      if (instance.instanceState !== prevInstance.instanceState) {
        return 'Instance state changed from ' + prevInstance.instanceState + ' to ' + instance.instanceState;
      }
    }
    return instance.name;
  }
}
