import {Injectable} from '@angular/core';
import {ModelService, InstanceChange} from '../../model/model.service';
import { Instance } from 'src/app/model/models/instance';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import * as cytoscape from 'cytoscape';
import { InstanceLink } from 'src/app/model/models/instanceLink';
import { Actions } from 'src/app/model/store.service';

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
      'Running': '../../../assets/images/crawler.png',
      'Failed' : '../../../assets/images/crawler.png',
      'Stopped' : '../../../assets/images/crawler.png',
      'Paused' : '../../../assets/images/crawler.png',
      'NotReachable' : '../../../assets/images/crawler.png' },
  'WebApp': {
    'Running': '../../../assets/images/webapp.png',
    'Failed' : '../../../assets/images/webapp.png',
    'Stopped' : '../../../assets/images/webapp.png',
    'Paused' : '../../../assets/images/webapp.png',
    'NotReachable' : '../../../assets/images/webapp.png' },
    'WebApi': {
      'Running': '../../../assets/images/webapi.png',
      'Failed' : '../../../assets/images/webapi.png',
      'Stopped' : '../../../assets/images/webapi.png',
      'Paused' : '../../../assets/images/webapi.png',
      'NotReachable' : '../../../assets/images/webapi.png' },
    'ElasticSearch': {
      'Running': '../../../assets/images/Elasticsearch.png',
      'Failed' : '../../../assets/images/Elasticsearch.png',
      'Stopped' : '../../../assets/images/Elasticsearch.png',
      'Paused' : '../../../assets/images/Elasticsearch.png',
      'NotReachable' : '../../../assets/images/Elasticsearch.png' },
};
@Injectable({
  providedIn: 'root'
})
export class GraphViewService {
  private elementProvider: BehaviorSubject<ElementUpdate>;
  private elementRemover: Subject<Array<string>>;

  constructor(private modelService: ModelService) {
    this.elementProvider = new BehaviorSubject<ElementUpdate>({type: Actions.NONE, elements: []});
    this.elementRemover = new BehaviorSubject<Array<string>>([]);

    this.modelService.getObservableForInstances().subscribe((change: InstanceChange) => {
      console.log('received notification in graph view service', change);
      if (change.elements !== undefined) {
        if (change.type === Actions.DELETE) {
          this.removeElements(change.elements);
        } else {
          this.handleElements(change.type, change.elements);
        }
      }
    });
  }

  private removeElements(instances: Array<Instance>) {
    const ids = instances.map((value: Instance) => '' + value.id);
    this.elementRemover.next(ids);
  }

  private handleElements(type: Actions, instances: Array<Instance>) {
    console.log('received new instance in graph view service', instances);
    const eles: Array<cytoscape.ElementDefinition> = this.createCytoscapeElements(instances);
    console.log('parsed instance to eles', eles);
    this.elementProvider.next({type: type, elements: eles});
  }

  private createCytoscapeElements(instances: Array<Instance>): Array<cytoscape.ElementDefinition>  {
    const newElements = instances.reduce(
      ( accumulator: NodeEdgeMap, value: Instance) => {

        accumulator.nodes.push({
          group: 'nodes',
          data: {
            id: '' + value.id,
            name: value.name,
            image: TYPE_TO_IMG[value.componentType][value.instanceState],
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
    const edges: Array<cytoscape.ElementDefinition> = links.map((edgeVal) => {
      return {data: {id: edgeVal.idFrom + '_' + edgeVal.idTo, source: edgeVal.idFrom, target: edgeVal.idTo, status: edgeVal.linkState}};
    });
    return edges;
  }

  public getElementObservable(): Observable<ElementUpdate> {
    return new Observable((observer) => {
      this.elementProvider.subscribe(observer);
      observer.next(this.elementProvider.value);
    });
  }

  public getElementRemoveObservable(): Observable<Array<string>> {
    return new Observable((observer) => {
      this.elementRemover.subscribe(observer);
    });
  }
}
