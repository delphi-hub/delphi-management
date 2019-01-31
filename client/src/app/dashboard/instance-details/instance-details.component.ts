import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InstanceDetails } from '../../model/models/instance';
import { MatTableDataSource } from '@angular/material';

const details: InstanceDetails[] = [
  { type: 'Warning', time: '2017-11-27T09:10:00', description: 'Public WebApi is overloaded' },
  { type: 'Error', time: '2017-11-27T09:10:00', description: 'Private Crawler is stopped' },
  { type: 'Information', time: '2017-11-27T09:10:00', description: 'Dubug Crawler was added' },
  { type: 'Information', time: '2017-11-27T09:10:00', description: 'Private Crawler was added' }
];

@Component({
  selector: 'app-instance-details',
  templateUrl: './instance-details.component.html',
  styleUrls: ['./instance-details.component.css']
})
export class InstanceDetailsComponent implements OnInit {

  displayedColumns: string[] = ['type', 'time', 'description'];
  dataSource = new MatTableDataSource<InstanceDetails>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = details;
  }

}
