import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<AddDialogComponent>) { }
  name: String;

  formControl = new FormControl('', [
    Validators.required
  ]);
  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('name') ? 'Not a valid name' :
        '';
  }

  onConfirmAddInstance(): void {

    this.thisDialogRef.close({
      status: 'Add',
      name: this.name
    });
  }

  onCloseCancle() {
    this.thisDialogRef.close('CancleAdd');

  }

}
