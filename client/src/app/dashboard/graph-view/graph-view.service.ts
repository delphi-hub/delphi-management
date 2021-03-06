import {Injectable} from '@angular/core';
import {ModelService, InstanceChange} from '../../model/model.service';
import { Instance } from 'src/app/model/models/instance';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import * as cytoscape from 'cytoscape';
import { InstanceLink } from 'src/app/model/models/instanceLink';
import { Actions, StoreService } from 'src/app/model/store.service';
import { GraphConfig } from './GraphConfig';
import { ApiService } from 'src/app/api/api/api.service';

interface NodeEdgeMap {
  nodes: Array<cytoscape.ElementDefinition>;
   edges: Array<cytoscape.ElementDefinition>;
}
export interface ElementUpdate {
  type: Actions;
  elements: Array<cytoscape.ElementDefinition>;
}
// 'Running' | 'Failed' | 'Stopped' | 'Paused' | 'NotReachable';
const TYPE_TO_IMG = {
  'Crawler': {
      'Running': '../../../assets/images/crawler-running.png',
      'Failed' : '../../../assets/images/crawler-failed.png',
      'Stopped' : '../../../assets/images/crawler-stopped.png',
      'Paused' : '../../../assets/images/crawler-paused.png',
      'NotReachable' : '../../../assets/images/crawler-failed.png',
      'Unknown' : '../../../assets/images/crawler.png',
     },
  'WebApp': {
    'Running': '../../../assets/images/webapp-running.png',
    'Failed' : '../../../assets/images/webapp-failed.png',
    'Stopped' : '../../../assets/images/webapp-stopped.png',
    'Paused' : '../../../assets/images/webapp-paused.png',
    'NotReachable' : '../../../assets/images/webapp-failed.png',
    'Unknown' : '../../../assets/images/webapp.png', },
    'WebApi': {
      'Running': '../../../assets/images/webapi-running.png',
      'Failed' : '../../../assets/images/webapi-failed.png',
      'Stopped' : '../../../assets/images/webapi-stopped.png',
      'Paused' : '../../../assets/images/webapi-paused.png',
      'NotReachable' : '../../../assets/images/webapi-failed.png',
      'Unknown' : '../../../assets/images/webapi.png', },
    'ElasticSearch': {
      'Running': '../../../assets/images/elasticsearch-running.png',
      'Failed' : '../../../assets/images/elasticsearch-failed.png',
      'Stopped' : '../../../assets/images/elasticsearch-stopped.png',
      'Paused' : '../../../assets/images/elasticsearch-paused.png',
      'NotReachable' : '../../../assets/images/elasticsearch-failed.png',
      'Unknown' : '../../../assets/images/elasticsearch.png'} ,
};


@Injectable({
  providedIn: 'root'
})
export class GraphViewService {
  private elementProvider: BehaviorSubject<ElementUpdate>;
  private elementRemover: Subject<Array<string>>;

  constructor(private modelService: ModelService, private apiService: ApiService, private storeService: StoreService) {
    this.elementProvider = new BehaviorSubject<ElementUpdate>({type: Actions.NONE, elements: []});
    this.elementRemover = new BehaviorSubject<Array<string>>([]);

    this.modelService.getObservableForInstances().subscribe((change: InstanceChange) => {
      if (change.elements !== undefined) {
        if (change.type === Actions.DELETE) {
          this.removeElements(change.elements);
        } else {
          this.handleElements(change.type, change.elements);
        }
      }
    });
  }

  public reconnect(from: string, to: string) {
    this.apiService.postReconnect(Number(from), Number(to)).subscribe((res) => {
      console.log('reconnect returned with result', res);
    });
  }

  private removeElements(instances: Array<Instance>) {
    const ids = instances.map((value: Instance) => '' + value.id);
    this.elementRemover.next(ids);
  }

  private handleElements(type: Actions, instances: Array<Instance>) {

    const eles: Array<cytoscape.ElementDefinition> = this.createCytoscapeElements(instances);
    this.elementProvider.next({type: type, elements: eles});
  }

  private createCytoscapeElements(instances: Array<Instance>): Array<cytoscape.ElementDefinition>  {
    const newElements = instances.reduce(
      ( accumulator: NodeEdgeMap, value: Instance) => {
        let img = TYPE_TO_IMG[value.componentType][value.instanceState];
        if (img === undefined) {
          img = TYPE_TO_IMG[value.componentType]['Unknown'];
        }
        accumulator.nodes.push({
          group: 'nodes',
          data: {
            id: '' + value.id,
            type: value.componentType,
            name: value.name,
            image: img,
            status: value.instanceState
          }
        });

        const outEdges: Array<cytoscape.ElementDefinition> = this.mapLinksToEdges(value.linksFrom);
        const inEdges: Array<cytoscape.ElementDefinition> = this.mapLinksToEdges(value.linksTo);
        accumulator.edges = accumulator.edges.concat(inEdges.concat(outEdges));

        return accumulator;
      }, {nodes: [], edges: []}
    );
    return newElements.nodes.concat(newElements.edges);
  }

  private mapLinksToEdges(links: Array<InstanceLink>): Array<cytoscape.ElementDefinition> {
    const edges: Array<cytoscape.ElementDefinition> = links.filter(edgeVal => this.targetsExists(edgeVal)).map((edgeVal) => {
        return {data: {id: edgeVal.idFrom + '_' + edgeVal.idTo, source: edgeVal.idFrom, target: edgeVal.idTo, status: edgeVal.linkState}};
    });
    return edges;
  }

  private targetsExists(instanceLink: InstanceLink) {

    const instances = this.storeService.getState().instances;
    if (instances[instanceLink.idFrom] && instances[instanceLink.idTo]) {
      return true;
    } else {
      return false;
    }
  }

  public getGraphConfig() {
    return new GraphConfig();
  }

  public getElementObservable(): Observable<ElementUpdate> {
    return new Observable((observer) => {
      // calculate init value
      const allInstances = Object.values(this.storeService.getState().instances);
      const cyElements = this.createCytoscapeElements(allInstances);
      observer.next({type: Actions.ADD, elements: cyElements});
      this.elementProvider.subscribe(observer);
    });
  }

  public getElementRemoveObservable(): Observable<Array<string>> {
    return this.elementRemover.asObservable();
  }
}
