import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {HttpClientModule} from '@angular/common/http'; 

@Component({
  selector: 'app-statuscard',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})

export class StatusCardComponent implements OnInit {
public deviceInfo = null;

  constructor(private deviceService: DeviceDetectorService) { 
this.infoFunction();
  }
    infoFunction() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      }

  ngOnInit() {
  }

}
