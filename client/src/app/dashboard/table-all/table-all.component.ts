import { Component, OnInit, Input } from '@angular/core';

import { MatTableDataSource} from '@angular/material';
import {Instance} from "../../api";


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
	@Input() data_array : Instance[];
	displayedColumns = ['ID', 'name', 'host', 'portNumber'];
	dataSource = new MatTableDataSource<Instance>(this.data_array);
   
   ngOnInit() {
   
  }
}











