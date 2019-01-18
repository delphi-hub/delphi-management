import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cytoscape from 'cytoscape';
import {GraphViewService, ElementUpdate} from '../graph-view.service';
import { Actions } from 'src/app/model/store.service';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {
  @ViewChild('cy') cyDiv: ElementRef;
  private cy: cytoscape.Core;
  private readonly layout: cytoscape.LayoutOptions;

  constructor(private graphViewService: GraphViewService) {
    this.layout = {
      name: 'grid',
      fit: true, // whether to fit the viewport to the graph
      padding: 30, // padding used on fit
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
      avoidOverlapPadding: 10, // extra spacing around nodes when avoidOverlap: true
      nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
      spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
      condense: false, // uses all available space on false, uses minimal space on true
      rows: undefined, // force num of rows in the grid
      cols: undefined, // force num of columns in the grid
      position: function( node ) {}, // returns { row, col } for element
      sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      ready: undefined, // callback on layoutready
      stop: undefined, // callback on layoutstop
    };
  }


  ngOnInit() {

    this.cy = cytoscape({
      container: this.cyDiv.nativeElement, // container to render in
      elements: [ // list of graph elements to start with
      ],
      layout: this.layout,
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

    this.graphViewService.getElementObservable().subscribe((update: ElementUpdate) => {
      if (update.elements) {
        if (update.type === Actions.ADD) {
          this.cy.add(update.elements);
        } else {
          if (update.type === Actions.CHANGE) {
            this.updateElements(update.elements);
          }
        }
        const layout = this.cy.layout(this.layout);
        layout.run();
      }
    });

    this.graphViewService.getElementRemoveObservable().subscribe((ids: Array<string>) => {
      if (ids) {
        for (let i = 0; i < ids.length; i++) {
          this.cy.remove(this.cy.getElementById(ids[i]));
        }
      }
    });

  }

  private updateElements(elements: Array<cytoscape.ElementDefinition>) {
    console.log('trying to update elements', elements);
    for (const element of elements) {
      console.log('element', element);
      // if element with id is not in cytoscape just add it
      const cyElement = this.cy.getElementById(element.data.id);
      console.log('cyElement', cyElement);
      if (cyElement.length === 0) {
        this.cy.add(element);
      } else { // else get the element and udpate it's data field
        cyElement.data(element.data);
      }
    }
  }

}
