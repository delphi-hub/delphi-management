import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webapi',
  templateUrl: './webapi.component.html',
  styleUrls: ['./webapi.component.css']
})
export class WebapiComponent implements OnInit {
//displayedColumns = ['status', 'name', 'version', 'startDate'];
  //dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  table_data : Element[];

  constructor() { }

  ngOnInit() {
  this.table_data = [
  {status: 'Finished', name:'test1',version:1, startDate:Date().toLocaleString()},
  {status: 'Finished', name:'test2',version:2, startDate:Date().toLocaleString()},
  {status: 'Finished', name:'test3',version:1, startDate:Date().toLocaleString()},
  {status: 'Finished', name:'test1',version:3, startDate:Date().toLocaleString()},
  {status: 'Listening', name:'test5',version:3, startDate:Date().toLocaleString()}
  ];
  }

}

export interface Element {
  status: string;
  name: string;
  version: number;
  startDate:string;
}
