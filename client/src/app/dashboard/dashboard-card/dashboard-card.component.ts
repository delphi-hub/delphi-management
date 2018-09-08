import { Component, OnInit, Input } from '@angular/core';
import { InstanceService, Instance } from '../../instance-registry-service';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})

/**
 * The dashboard-card component is used to provide
 * an overview of the status of the given component.
 * The needed information are querried based on the
 * given componentType.
 */
export class DashboardCardComponent implements OnInit {

  @Input() img: string;
  @Input() route: string;
  @Input() title: string;
  @Input() componentType: string;

  numberOfInstances: string;
  numberOfFailedInstances: string;
  private irService: InstanceService;

  constructor(irService: InstanceService) {
    this.irService = irService;
    this.numberOfFailedInstances = 'No server connection';
   }

  ngOnInit() {
    // this has to be called onInit and not in the constructor, due
    // to the component lifecycle. Input's are not initialized in
    // the constructor.
    this.setInstanceNumber();
  }

  /**
   * Uses the instance service to query the number of instances in the current system.
   * If there is no server connection the value is set to a default error message.
   */
  private setInstanceNumber() {
    this.irService.getInstanceNumber(this.componentType).subscribe((amount: number) => {
      this.numberOfInstances = '' + amount;
    }, (error) => {
      this.numberOfInstances = 'No server connection';
    });
  }

}
