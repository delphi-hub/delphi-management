import { InfoCenter } from '../../model/models/instance';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';



const infoTable: InfoCenter[] = [
  { type: 'Warning', time: '2017-11-27T09:10:00', description: 'Public WebApi is overloaded' },
  { type: 'Error', time: '2017-11-27T09:10:00', description: 'Private Crawler is stopped' },
  { type: 'Information', time: '2017-11-27T09:10:00', description: 'Dubug Crawler was added' },
  { type: 'Information', time: '2017-11-27T09:10:00', description: 'Private Crawler was added' }
];


@Component({
  selector: 'app-infor-center',
  templateUrl: './infor-center.component.html',
  styleUrls: ['./infor-center.component.css']
})



export class InforCenterComponent implements OnInit {

  displayedColumns: string[] = ['type', 'time', 'description'];
  dataSource = new MatTableDataSource<InfoCenter>();


  constructor() {

    this.dataSource.data = infoTable;
  }

  ngOnInit() {



  }

}
