import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Instance } from 'src/app/model/models/instance';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Instance) { }

  ngOnInit() {
  }

  onCloseConfirm() {
      this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
      this.thisDialogRef.close('Cancel');

  }

}
