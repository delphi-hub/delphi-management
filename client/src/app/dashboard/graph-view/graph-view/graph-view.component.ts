import {Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import * as cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import {GraphViewService, ElementUpdate} from '../graph-view.service';
import { Actions } from 'src/app/model/store.service';
import { LinkStateEnum } from 'src/app/model/models/instanceLink';
import { MatDialog } from '@angular/material';
import { ConnectDialogComponent } from '../connect-dialog/connect-dialog.component';
import { ComponentTypeEnum, ComponentType } from 'src/app/model/models/instance';
import { GraphConfig } from '../GraphConfig';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.css']
})
export class GraphViewComponent implements OnInit, OnDestroy {
  @ViewChild('cy') cyDiv: ElementRef;
  private cy: cytoscape.Core;
  private config: GraphConfig;
  private elementSubscription: Subscription;
  private elementRemoveSubscription: Subscription;

  constructor(private graphViewService: GraphViewService, public dialog: MatDialog) {

  }


  ngOnInit() {

    this.configureCytoscape();
    this.addEdgeDragListener();
    this.addChangeListener();
  }

  ngOnDestroy() {
    this.cy.destroy();
    this.elementSubscription.unsubscribe();
    this.elementRemoveSubscription.unsubscribe();
  }

  /**
   * Adds listeners to the graphViewService and describe how the
   * view should be updated if it receives any changes / updates.
   */
  private addChangeListener() {
    this.elementSubscription = this.graphViewService.getElementObservable().subscribe((update: ElementUpdate) => {
      if (update.elements) {
        if (update.type === Actions.ADD) {
          this.cy.add(update.elements);
        } else {
          if (update.type === Actions.CHANGE) {
            this.updateElements(update.elements);
          }
        }
        this.cy.edges().style('line-color', function (ele: cytoscape.EdgeSingular) {
          const status = ele.data('status');
          switch (status) {
            case LinkStateEnum.Assigned: return 'green';
            case LinkStateEnum.Failed: return 'red';
            case LinkStateEnum.Outdated: return 'grey';
            default: return 'orange';
          }
        });
        const layout = this.cy.layout(this.config.layout);
        layout.run();
      }
    });

    this.elementRemoveSubscription = this.graphViewService.getElementRemoveObservable().subscribe((ids: Array<string>) => {
      if (ids) {
        for (let i = 0; i < ids.length; i++) {
          this.cy.remove(this.cy.getElementById(ids[i]));
        }
      }
    });
  }

  /**
   * Configures the components behavior when an edge is draged from one
   * node to another.
   */
  private addEdgeDragListener() {
    let removedElements: cytoscape.CollectionReturnValue;

    (this.cy as any).on('ehstop', (event: any, sourceNode: cytoscape.NodeSingular) => {
      this.cy.add(removedElements);
    });

    (this.cy as any).on('ehcomplete',
      (event: any, sourceNode: cytoscape.NodeSingular, targetNode: cytoscape.NodeSingular, addedEles: any) => {

        const edgesSource = sourceNode.connectedEdges();

        const nodeToDisconnect = this.getNodeToDisconnect(edgesSource, sourceNode, targetNode);
        const nodeName = nodeToDisconnect.reduce((prevVal, ele) => {
          return ele.data('name');
        }, '');
        const dialogRef = this.dialog.open(ConnectDialogComponent, { data: {
          nameOne: sourceNode.data('name'),
          nameTwo: nodeName,
          nameThree: targetNode.data('name')}});
        dialogRef.afterClosed().subscribe((reconnect: boolean) => {
          if (reconnect) {
            this.graphViewService.reconnect(sourceNode.data('id'), targetNode.data('id'));
          }
          this.cy.remove(addedEles);
        });
    });

    (this.cy as any).on('ehstart', (event: any, sourceNode: cytoscape.NodeSingular) => {

      const allElesToHide = this.getCorrespondingEles(sourceNode);
      console.log('all eles to hide', allElesToHide);
      // we want to show the source node.
      if (allElesToHide.length > 0) {
        const elesToHide = allElesToHide.symmetricDifference(sourceNode);
        console.log('eles to actually hide', elesToHide);
        removedElements = elesToHide.remove();
      }

    });
  }

  private getNodeToDisconnect(edgeList: cytoscape.EdgeCollection, sourceNode: cytoscape.NodeSingular,
    targetNode: cytoscape.NodeSingular ): cytoscape.NodeSingular {
    console.log('edge list', edgeList);
    const nodes = edgeList.connectedNodes();
    console.log('connected nodes', nodes);
    const correspondingEles = this.getCorrespondingEles(sourceNode, nodes);

    const actualElement = nodes.symmetricDifference(correspondingEles).symmetricDifference(targetNode);
    if (actualElement.length > 1) {
      console.log('invalid element:', actualElement);
      throw new Error('Invalid node collection returned');
    }

    return actualElement;
  }

  private getCorrespondingEles(node: cytoscape.NodeSingular, eles?: cytoscape.NodeCollection): cytoscape.NodeCollection {
      const type = node.data('type');
      let result: cytoscape.NodeCollection = this.cy.collection();
      switch (type) {
        case ComponentTypeEnum.WebApi:
        result = this.getElementsWithDifferentType(ComponentTypeEnum.ElasticSearch, eles);
          break;
        case ComponentTypeEnum.WebApp:
        result = this.getElementsWithDifferentType(ComponentTypeEnum.WebApi, eles);
          break;
        case ComponentTypeEnum.Crawler:
        result = this.getElementsWithDifferentType(ComponentTypeEnum.ElasticSearch, eles);
          break;
      }
      return result;
  }
  /**
   * Returns all elements to hide except those
   * of the given @param type.
   */
  private getElementsWithDifferentType(type: ComponentType, eles?: cytoscape.NodeCollection): cytoscape.NodeCollection {
    console.log('type', type);
    console.log('eles', eles);
    return eles ? eles.nodes('node[type !="' + type + '"]') : this.cy.nodes('node[type !="' + type + '"]');
  }

  private updateElements(elements: Array<cytoscape.ElementDefinition>) {
    for (const element of elements) {
      // if element with id is not in cytoscape just add it
      const cyElement = this.cy.getElementById(element.data.id);
      if (cyElement.length === 0) {
        this.cy.add(element);
      } else { // else get the element and udpate it's data field
        cyElement.data(element.data);
      }
    }
  }


  /**
   * Initializes cytoscape and registers the edge drag and drop extension.
   */
  private configureCytoscape() {
    this.config = this.graphViewService.getGraphConfig();
    this.config.cytoscapeConfig.container = this.cyDiv.nativeElement;

    this.cy = cytoscape(this.config.cytoscapeConfig);
    if (!Object.getPrototypeOf(this.cy).edgehandles) {
      cytoscape.use(edgehandles);
    }

    (this.cy as any).edgehandles(this.config.edgeDragConfig);
  }
}
