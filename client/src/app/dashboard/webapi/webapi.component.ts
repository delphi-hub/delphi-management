import { Component, OnInit } from '@angular/core';
import {Element} from '../table-all/table-all.component';

@Component({
  selector: 'app-webapi',
  templateUrl: './webapi.component.html',
  styleUrls: ['./webapi.component.css']
})
export class WebapiComponent implements OnInit {

  table_data: Element[];

  constructor() { }

  ngOnInit() {
  this.table_data = [
  {status: 'Finished', name: 'test1', version: 1, startDate: Date().toLocaleString()},
  {status: 'Finished', name: 'test2', version: 2, startDate: Date().toLocaleString()},
  {status: 'Finished', name: 'test3', version: 1, startDate: Date().toLocaleString()},
  {status: 'Finished', name: 'test1', version: 3, startDate: Date().toLocaleString()},
  {status: 'Listening', name: 'test5', version: 3, startDate: Date().toLocaleString()}
  ];
  }

}
