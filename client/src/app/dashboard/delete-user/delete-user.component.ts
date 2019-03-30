import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/model/models/user';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(public thisDialogDel: MatDialogRef<DeleteUserComponent>, @Inject(MAT_DIALOG_DATA) public userData: User) { }

  ngOnInit() {
  }
  confirmDeleteUser() {
    this.thisDialogDel.close('Confirm');
  }

  cancelDeleteUser() {
    this.thisDialogDel.close('Cancel');

  }

}

