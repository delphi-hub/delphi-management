import { Component, OnInit } from '@angular/core';
import {Instance} from "../../api";

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  constructor() { }

  crawler = Instance.ComponentTypeEnum.Crawler;
  webApi = Instance.ComponentTypeEnum.WebApi;
  webApp = Instance.ComponentTypeEnum.WebApp;

  ngOnInit() {
  }

}
