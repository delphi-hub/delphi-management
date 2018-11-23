import {Injectable} from '@angular/core';
import {ModelService} from '../../model/model.service';
import { Instance } from 'src/app/model/models/instance';
import { BehaviorSubject, Observable} from 'rxjs';
import * as cytoscape from 'cytoscape';
import { InstanceLink } from 'src/app/model/models/instanceLink';

interface NodeEdgeMap {
  nodes: Array<cytoscape.ElementDefinition>;
   edges: Array<cytoscape.ElementDefinition>;
  }
const TYPE_TO_IMG = {'Crawler': '../../../assets/images/crawler.png',
 'WebApp': '../../../assets/images/webapp.png',
 'WebApi': '../../../assets/images/webapi.png',
 'ElasticSearch': '../../../assets/images/webapi.png'};
@Injectable({
  providedIn: 'root'
})
export class GraphViewService {
  private elementProvider: BehaviorSubject<Array<cytoscape.ElementDefinition>>;

  constructor(private modelService: ModelService) {
    this.elementProvider = new BehaviorSubject<Array<cytoscape.ElementDefinition>>([]);

    this.modelService.getObservableForInstances().subscribe((instances: Array<Instance>) => {
      console.log('received observable update in graph service', instances);
      if (instances !== undefined) {
        console.log('received new instance', instances);
        const newElements: NodeEdgeMap = instances.reduce(
          ( accumulator: NodeEdgeMap, value: Instance) => {
            accumulator.nodes.push({group: 'nodes', data: {id: '' + value.id, name: value.name, image: TYPE_TO_IMG[value.componentType]}});
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
    });
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
}
