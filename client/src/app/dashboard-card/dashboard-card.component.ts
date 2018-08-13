import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

export class DashboardCardComponent implements OnInit {
  @Input() img: String;
  @Input() route: String;
  numberOfInstances: string;
  @Input() title: String;
  @Input() componentType: String;

  constructor() { }

  ngOnInit() {
  }

  private queryInstanceNumber() {
    // TODO: call the generated swagger code to get the
    // number of instances. Make it fault prove, no server connection
    // should result in a default display and should not cause
    // the application to crash
  }

}
