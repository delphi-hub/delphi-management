import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {GraphViewService} from '../graph-view.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {
  @ViewChild('cy') cyDiv: ElementRef;
  private cy: cytoscape.Core;

  constructor(private graphViewService: GraphViewService) {

  }


  ngOnInit() {

    this.cy = cytoscape({
      container: this.cyDiv.nativeElement, // container to render in
      elements: [ // list of graph elements to start with
      ],
      layout: {
        name: 'preset'
      },
      style: [{
        selector: 'node',
        style: {
          label: 'data(name)',
          'background-image': 'data(image)',
          'width': '70%',
          'height': '70%',
          'background-opacity': 0,

          'background-fit': 'contain',
          'background-clip': 'none',
        }
      }
      ]
    });

    this.graphViewService.getElementObservable().subscribe((newElements: Array<cytoscape.ElementDefinition>) => {
      if (newElements) {
        this.cy.add(newElements);
      }
    });

  }

}
