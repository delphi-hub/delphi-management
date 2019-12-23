import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.css']
})
export class ConnectDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {nameOne: string, nameTwo: string, nameThree: string}) { }

  ngOnInit() {
  }

}
