import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
    ToastModule,
    CommonModule,
    MessagesModule,
    MessageModule,
    NgxSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  initloginForm(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }

  initloginFormGroup(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  constructor() {
    this.initloginForm();
    this.initloginFormGroup();
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('login form not valid');
    }
  }
}