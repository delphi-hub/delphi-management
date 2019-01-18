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

    this.graphViewService.getElementObservable().subscribe((update: ElementUpdate) => {
      if (update.elements) {
        if (update.type === Actions.ADD) {
          this.cy.add(update.elements);
        } else {
          if (update.type === Actions.CHANGE) {
            this.updateElements(update.elements);
          }
        }
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
