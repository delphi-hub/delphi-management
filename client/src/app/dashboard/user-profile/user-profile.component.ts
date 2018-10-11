import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

	notification_level: string;
	levels: string[] = ['Only severe level', 'Both severe and medium level', 'Only medium level', 'All levels'];
	name =  new FormControl('', [Validators.required]);
	email = new FormControl('', [Validators.required, Validators.email]);
	

	getErrorMessageName() {
    return this.name.hasError('required') ? 'This is a required field' :
            '';
  }

  	getErrorMessageEmail() {
    return this.email.hasError('required') ? 'This is a required field' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor() { }

  ngOnInit() {
  }

}
