import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import {ApiService, Instance} from '../../api';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) { }

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
   
   		console.log("added data",this.data);
       let result = {'status':'Add', 'instance' : this.data};
       console.log("added data new",this.data, this.data.instance.componentType, this.data.name);
       this.apiService.postInstance(this.data.instance.componentType, this.data.name).subscribe((result: any) => {
       console.log('result', result);
        this.thisDialogRef.close(result);
        }, err => {
          console.log('error receiving data for crawler');
        });	
  	}

    console.log("added data",this.data);
    let result = {'status':'Add', 'instance' : this.data};
    console.log("added data new",this.data, this.data.instance.componentType, this.data.name);
    this.apiService.postInstance(this.data.instance.componentType, this.data.name).subscribe((result: any) => {
      console.log('result', result);
      this.thisDialogRef.close(result);
    }, err => {
      console.log('error receiving data for Instance');
    });
  }

  onCloseCancle(){
    this.thisDialogRef.close('Cancle');

  }

}
