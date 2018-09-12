import { Component, OnInit } from '@angular/core';
import {ApiService, Instance} from "../../api";

@Component({
  selector: 'app-webapp',
  templateUrl: './webapp.component.html',
  styleUrls: ['./webapp.component.css']
})
export class WebappComponent implements OnInit {
  // this array is inserted into the table all component in the html code
  table_data: Instance[];
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.table_data = [];

    this.apiService.getInstances(Instance.ComponentTypeEnum.WebApp).subscribe((result: Array<Instance>) => {
      console.log("received result", result);
      this.table_data = result;

    }, err => {
      console.log("error during get instances for web app");
    })
  }

}
