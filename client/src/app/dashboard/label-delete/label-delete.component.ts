import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instance } from 'src/app/model/models/instance';


@Component({
  selector: 'app-label-delete',
  templateUrl: './label-delete.component.html',
  styleUrls: ['./label-delete.component.css']
})
export class LabelDeleteComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<LabelDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: Instance) { }

  ngOnInit() {
  }

  onConfirm() {
      this.thisDialogRef.close('Confirm');
  }

  onCancel() {
      this.thisDialogRef.close('Cancel');

  }

}
