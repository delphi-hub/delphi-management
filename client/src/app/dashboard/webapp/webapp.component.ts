import { Component, OnInit } from '@angular/core';
import {Element} from '../table-all/table-all.component';

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {

  table_data: Element[];
  constructor() {
  }

  ngOnInit() {
    this.table_data = [
      {status: 'Finished', name: 'test1', version: 1, startDate: Date().toLocaleString()},
      {status: 'Listining', name: 'test2', version: 2, startDate: Date().toLocaleString()},
      {status: 'Finished', name: 'test3', version: 1, startDate: Date().toLocaleString()},
      {status: 'Finished', name: 'test1', version: 3, startDate: Date().toLocaleString()}
    ];
  }

}
