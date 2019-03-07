/*
 * Copyright (C) 2018 The Delphi Team.
 * See the LICENCE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  hide = true;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {

  }

  getErrorMessageName() {
    return this.loginForm.hasError('required') ? 'Username is required field' :
      this.loginForm.hasError('username') ? 'Not a valid name' :
        '';
  }
  getErrorMessagePwd() {
    return this.loginForm.hasError('required') ? 'Password is required field' :
        '';
  }
  login() {
    console.log('MY LOGIN FORM', this.loginForm);
    console.log('nuser', this.loginForm.value.username);
   // console.log('user', this.username, this.password);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
