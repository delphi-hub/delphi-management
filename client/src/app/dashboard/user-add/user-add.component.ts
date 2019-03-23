import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';


export interface usertypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  constructor(public thisDialogRefUser: MatDialogRef<UserAddComponent>) { }
  userName: String;
  secret: String;
  userType: usertypes[] = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'User', viewValue: 'User'}
  ];
  

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
  }

  getErrorMessageName() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('name') ? 'Not a valid name' :
        '';
  }

  getErrorMessageUsertype() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }

  onConfirmAddUser(): void {
    console.log("username",this.userName);

    this.thisDialogRefUser.close({
      status: 'Add',
      userName: this.userName,
      secret: this.secret,
      userType: this.userType
    });
  }

  onCloseCancelUser() {
    this.thisDialogRefUser.close('CancelAdd');

  }

}
