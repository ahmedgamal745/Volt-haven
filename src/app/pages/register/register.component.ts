import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { RegisterData } from '../../core/interfaces/register-data';
import { RouterLink, Router } from '@angular/router';
import { ErorrMessageService } from '../../core/services/erorr-message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, PanelModule, ButtonModule,
    InputTextModule, RouterLink, ToastModule, CommonModule,
    MessagesModule, MessageModule, NgxSpinnerModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  CnfirmationPassword!: FormControl;
  registrationForm!: FormGroup;

  initFormControls(): void {
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.CnfirmationPassword = new FormControl('', [Validators.required, this.ConfirmPassword(this.password)]);
  }

  initFormGroup(): void {
    this.registrationForm = new FormGroup(({
      name: this.name,
      email: this.email,
      password: this.password,
      CnfirmationPassword: this.CnfirmationPassword
    }))
  }

  constructor(
    private MEroror: ErorrMessageService,
    private auth: AuthService,
    private loadingSpinner: NgxSpinnerService,
    private router: Router
  ) {
    this.initFormControls();
    this.initFormGroup();
  }

  ConfirmPassword(pass: AbstractControl): ValidatorFn {
    return (repass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value == repass.value) {
        return null;
      } else {
        return { passNotMatch: true };
      }
    }
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      this.MEroror.showError('Please fill in all required fields correctly.');
      return;
    } else {
      this.userRegister(this.registrationForm.value);
    }
  }

  userRegister(data: RegisterData): void {
    this.loadingSpinner.show();
    this.auth.userRegister(data).subscribe({
      next: (res) => {
        this.MEroror.showError('Registration successful!');
        this.loadingSpinner.hide();
        this.router.navigate(['/login']);
        this.registrationForm.reset();
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.loadingSpinner.hide();
        const errorMessage = err.error.error;
        this.MEroror.showError(errorMessage);
      }
    });
  }
}
