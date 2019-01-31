import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import {GraphViewService, ElementUpdate} from '../graph-view.service';
import { Actions } from 'src/app/model/store.service';
import { LinkStateEnum } from 'src/app/model/models/instanceLink';
import { MatDialog } from '@angular/material';
import { ConnectDialogComponent } from '../connect-dialog/connect-dialog.component';
import { ComponentTypeEnum, ComponentType } from 'src/app/model/models/instance';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit {
  @ViewChild('cy') cyDiv: ElementRef;
  private cy: cytoscape.Core;
  private readonly layout: cytoscape.LayoutOptions;

  constructor(private graphViewService: GraphViewService, public dialog: MatDialog) {
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
    cytoscape.use(edgehandles);
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
      }]
    });
    // the default values of each option are outlined below:
const defaults = {
  preview: true, // whether to show added edges preview before releasing selection
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true,
  handlePosition: function( node ) {
    return 'middle top'; // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
  },
  handleInDrawMode: false, // whether to show the handle in draw mode
  edgeType: function( sourceNode, targetNode ) {
    // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
    // returning null/undefined means an edge can't be added between the two nodes
    return 'flat';
  },
  loopAllowed: function( node ) {
    // for the specified node, return whether edges from itself to itself are allowed
    return false;
  },
  nodeLoopOffset: -50, // offset for edgeType: 'node' loops
  nodeParams: function( sourceNode, targetNode ) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for intermediary node
    return {};
  },
  edgeParams: function( sourceNode, targetNode, i ) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    // NB: i indicates edge index in case of edgeType: 'node'
    return {};
  },
  ghostEdgeParams: function() {
    // return element object to be passed to cy.add() for the ghost edge
    // (default classes are always added for you)
    return {};
  },
  show: function( sourceNode ) {
    // fired when handle is shown
  },
  hide: function( sourceNode ) {
    // fired when the handle is hidden
  },
  start: function( sourceNode ) {
    // fired when edgehandles interaction starts (drag on handle)
  },
  complete: function( sourceNode, targetNode, addedEles ) {
    // fired when edgehandles is done and elements are added
  },
  stop: function( sourceNode ) {
    // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
  },
  cancel: function( sourceNode, cancelledTargets ) {
    // fired when edgehandles are cancelled (incomplete gesture)
  },
  hoverover: function( sourceNode, targetNode ) {
    // fired when a target is hovered
  },
  hoverout: function( sourceNode, targetNode ) {
    // fired when a target isn't hovered anymore
  },
  previewon: function( sourceNode, targetNode, previewEles ) {
    // fired when preview is shown
  },
  previewoff: function( sourceNode, targetNode, previewEles ) {
    // fired when preview is hidden
  },
  drawon: function() {
    // fired when draw mode enabled
  },
  drawoff: function() {
    // fired when draw mode disabled
  }
};
    let removedElements;
    (this.cy as any).on('ehstop', (event, sourceNode: cytoscape.NodeSingular) => {
      this.cy.add(removedElements);
    });
    (this.cy as any).edgehandles(defaults);
    (this.cy as any).on('ehcomplete', (event, sourceNode: cytoscape.NodeSingular, targetNode, addedEles) => {
      console.log('position', sourceNode, targetNode, addedEles);
      const edgesSource = sourceNode.edges;
      console.log('edges', edgesSource);
      const dialogRef = this.dialog.open(ConnectDialogComponent, { data: {
        nameOne: sourceNode.data.name,
        nameTwo: 'two',
        nameThree: targetNode.data.name}});
      dialogRef.afterClosed().subscribe(() => {
        console.log('closed');
      });
    });

    (this.cy as any).on('ehstart', (event, sourceNode: cytoscape.NodeSingular) => {
      const type = sourceNode.data('type');
      let allElesToHide: cytoscape.CollectionReturnValue;
      switch (type) {
        case ComponentTypeEnum.WebApi:
          allElesToHide = this.getElementsToHide(ComponentTypeEnum.ElasticSearch);
          break;
        case ComponentTypeEnum.WebApp:
          allElesToHide = this.getElementsToHide(ComponentTypeEnum.WebApi);
          break;
        case ComponentTypeEnum.Crawler:
          allElesToHide = this.getElementsToHide(ComponentTypeEnum.ElasticSearch);
          break;
      }
      // we want to show the source node.
      const elesToHide = allElesToHide.symmetricDifference(sourceNode);
      removedElements = elesToHide.remove();
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
        this.cy.edges().style('line-color', function (ele: any) {
          const status = ele.data('status');
          switch (status) {
            case LinkStateEnum.Assigned: return 'green';
            case LinkStateEnum.Failed: return 'red';
            case LinkStateEnum.Outdated: return 'grey';
            default: return 'orange';
          }
        });
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

  /**
   * Returns all elements to hide except those
   * of the given @param type.
   */
  private getElementsToHide(type: ComponentType): cytoscape.CollectionReturnValue {
    return this.cy.elements('node[type !="' + type + '"]');
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
