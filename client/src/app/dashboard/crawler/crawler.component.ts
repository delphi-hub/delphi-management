import {Component, OnInit} from '@angular/core';
import {ApiService, Instance} from '../../api';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.css']
})
export class CrawlerComponent implements OnInit {

  // this array is inserted into the table all component in the html code
  table_data: Instance[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

    this.table_data = [];

    this.apiService.getInstances(Instance.ComponentTypeEnum.Crawler).subscribe((result: Array<Instance>) => {
      this.table_data = result;
    }, err => {
      console.log('error receiving data for crawler');
    });
  }

}

