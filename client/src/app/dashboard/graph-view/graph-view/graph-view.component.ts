import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {ModelService} from '../../../model/model.service';
import {GraphViewService} from '../graph-view.service';
import {Instance} from '../../../model/models/instance';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {
  @ViewChild('cy') cyDiv: ElementRef;
  private cy: cytoscape.Core;

  constructor(private graphViewService: GraphViewService, private modelService: ModelService) {

  }


  ngOnInit() {

    this.cy = cytoscape({
      container: this.cyDiv.nativeElement, // container to render in
      elements: [ // list of graph elements to start with
      ],
    });
    this.modelService.getObservableForInstances().subscribe((instances: Array<Instance>) => {
      if (instances !== undefined) {
        console.log('received new instance', instances);
        instances.forEach((instance) => {
          // this.cy.add({group: 'nodes', data: {id: '' + instance.id}});
          const ele: cytoscape.ElementDefinition = {data: {id: '' + instance.id}};
          console.log('trying to add element', ele);
          this.cy.add(ele);
        });
      }
    });
  }

}
