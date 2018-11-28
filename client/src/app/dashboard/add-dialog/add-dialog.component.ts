import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ApiService} from "../../api/api/api.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<AddDialogComponent>, private apiService: ApiService) { }
  name: String;
  ngOnInit() {
    //console.log('data.type', this.data);
  }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

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
    this.thisDialogRef.close('Cancle');

  }

}
