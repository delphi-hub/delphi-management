import { Component, OnInit } from '@angular/core';
import {ApiService, Instance} from '../../api';

@Component({
  selector: 'app-web-api',
  templateUrl: './web-api.component.html',
  styleUrls: ['./web-api.component.css']
})

export class WebApiComponent implements OnInit {
  // this array is inserted into the table all component in the html code
  table_data: Instance[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.table_data = [];

    this.apiService.getInstances(Instance.ComponentTypeEnum.WebApi).subscribe((result: Array<Instance>) => {
      console.log('received result', result);
      this.table_data = result;
    }, (err) => {
      console.log('error during get instances for Web Api');
    });
  }

}
