import {Injectable} from '@angular/core';
import {ModelService} from '../../model/model.service';
import { Instance } from 'src/app/model/models/instance';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import * as cytoscape from 'cytoscape';
import { InstanceLink } from 'src/app/model/models/instanceLink';
import { Change, Actions } from 'src/app/model/store.service';

interface NodeEdgeMap {
  nodes: Array<cytoscape.ElementDefinition>;
   edges: Array<cytoscape.ElementDefinition>;
  }
const TYPE_TO_IMG = {'Crawler': '../../../assets/images/crawler.png',
 'WebApp': '../../../assets/images/webapp.png',
 'WebApi': '../../../assets/images/webapi.png',
 'ElasticSearch': '../../../assets/images/Elasticsearch.png'};
@Injectable({
  providedIn: 'root'
})
export class GraphViewService {
  private elementProvider: BehaviorSubject<Array<cytoscape.ElementDefinition>>;
  private elementRemover: Subject<Array<string>>;

  constructor(private modelService: ModelService) {
    this.elementProvider = new BehaviorSubject<Array<cytoscape.ElementDefinition>>([]);
    this.elementRemover = new BehaviorSubject<Array<string>>([]);

    this.modelService.getObservableForInstances().subscribe((change: Change) => {
      console.log('received notification in graph view service', change);
      if (change.elements !== undefined) {
        switch (change.type) {
          case Actions.ADD:
            this.addElements(change.elements);
            break;
          case Actions.DELETE:
            this.removeElements(change.elements);
        }
      }
    });
  }

  private removeElements(instances: Array<Instance>) {
    const ids = instances.map((value: Instance) => '' + value.id);
    this.elementRemover.next(ids);
  }

  private addElements(instances: Array<Instance>) {
    console.log('received new instance in graph view service', instances);
    const newElements: NodeEdgeMap = instances.reduce(
      ( accumulator: NodeEdgeMap, value: Instance) => {

        accumulator.nodes.push({
          group: 'nodes',
          data: {
            id: '' + value.id,
            name: value.name,
            image: TYPE_TO_IMG[value.componentType]
          }
        });

        const outEdges: Array<cytoscape.ElementDefinition> = this.mapLinksToEdges(value.linksFrom);
        const inEdges: Array<cytoscape.ElementDefinition> = this.mapLinksToEdges(value.linksTo);
        accumulator.edges = accumulator.edges.concat(inEdges.concat(outEdges));

        return accumulator;
      }, {nodes: [], edges: []}
    );
    const eles: Array<cytoscape.ElementDefinition> = newElements.nodes.concat(newElements.edges);
    console.log('parsed instance to eles', eles);
    this.elementProvider.next(eles);
  }

  private mapLinksToEdges(links: Array<InstanceLink>): Array<cytoscape.ElementDefinition> {
    const edges: Array<cytoscape.ElementDefinition> = links.map((edgeVal) => {
      return {data: {id: edgeVal.idFrom + '_' + edgeVal.idTo, source: edgeVal.idFrom, target: edgeVal.idTo}};
    });
    return edges;
  }

  public getElementObservable(): Observable<Array<cytoscape.ElementDefinition>> {
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
