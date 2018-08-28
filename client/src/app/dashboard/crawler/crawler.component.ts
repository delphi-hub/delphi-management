import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {Element} from '../table-all/table-all.component';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {
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
