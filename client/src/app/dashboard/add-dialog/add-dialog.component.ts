import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Instance } from '../../api';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<AddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Instance) { }

  ngOnInit() {
  }

  onConfirmAddInstance(): void {
   
   		console.log("added data",this.data);
   		let result = {'status':'Add', 'instance' : this.data};
   		this.thisDialogRef.close(result);
  	}

  onCloseCancle(){
  		this.thisDialogRef.close('Cancle');

  }

}
