import { Component, OnInit, Input } from '@angular/core';
import { InstanceService, Instance } from '../../instance-registry-service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

export class DashboardCardComponent implements OnInit {
  @Input() img: string;
  @Input() route: string;
  numberOfInstances: string;
  numberOfFailedInstances: string;
  @Input() title: string;
  @Input() componentType: string;

  private irService: InstanceService;
  constructor(irService: InstanceService) {
    this.irService = irService;
    this.numberOfFailedInstances = 'No server connection';
   }

  ngOnInit() {
    this.queryInstanceNumber();
  }

  private queryInstanceNumber() {
    // TODO: call the generated swagger code to get the
    // number of instances. Make it fault prove, no server connection
    // should result in a default display and should not cause
    // the application to crash
    this.irService.getInstanceNumber(this.componentType).subscribe((amount: number) => {
      this.numberOfInstances = '' + amount;
    }, (error) => {
      // console.log('currently there is no server connection. error:', error);
      this.numberOfInstances = 'No server connection';
    });
  }

}
