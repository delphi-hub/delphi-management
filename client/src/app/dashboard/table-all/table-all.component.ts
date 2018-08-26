import { Component, OnInit, Input } from '@angular/core';
import { InstanceService, Instance } from '../../instance-registry-service';
import { MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
	@Input() data_array : Element[];
	displayedColumns = ['status', 'name', 'version', 'startDate'];
	dataSource = new MatTableDataSource<Element>(this.data_array);
   
   ngOnInit() {
   
  }
}

export interface Element {
  status: string;
  name: string;
  version: number;
  startDate:string;
}










