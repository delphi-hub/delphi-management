import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css']
})
export class LabelDialogComponent implements OnInit {

  constructor(public thislabelDialogRef: MatDialogRef<LabelDialogComponent>) { }

  labelName: String;

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('labelName') ? 'Not a valid name' :
        '';
  }

  onConfirmAddLabel(): void {

    this.thislabelDialogRef.close({
      status: 'Add',
      labelName: this.labelName
    });
  }

  onCloseCancelLabel() {
    this.thislabelDialogRef.close('CancelLabel');
  }

  onKeydown(event) {
    console.log(event);
    this.thislabelDialogRef.close({
      status: 'Add',
      labelName: this.labelName
      });
    }
}
