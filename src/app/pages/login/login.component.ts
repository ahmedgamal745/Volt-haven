import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  NgxSpinnerService } from 'ngx-spinner';
import {  Router } from '@angular/router';
import { ErorrMessageService } from '../../core/services/erorr-message.service';
import { LoginData } from '../../core/interfaces/login-data';
import { AuthService } from '../../core/services/auth.service';
import { SharedModuleModule } from '../../shared/sharedModule/shared-module/shared-module.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
   SharedModuleModule
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

  constructor(private loadingSpinner: NgxSpinnerService,private MEroror: ErorrMessageService,private auth: AuthService, private router: Router) {
    this.initloginForm();
    this.initloginFormGroup();
  }

  loginSubmit() {
    if (!this.loginForm.valid) {
      this.MEroror.showError('Please fill in all required fields correctly.')
      
    } else {
      
      this.logIn(this.loginForm.value);
    }
  }
  

  logIn(data:LoginData){
    this.loadingSpinner.show()
    this.auth.userLogin(data).subscribe({
      next: (res)=>{
        if(res._id){
          localStorage.setItem('token',res._id)
        }
        this.loadingSpinner.hide();
        this.MEroror.showSuccess('Registration successful!')
        this.router.navigate(['/user']);
        this.loginForm.reset();
        
      },
      error:(err)=>{
        this.loadingSpinner.hide();
        const errorMessage = err.error.error;
        this.MEroror.showError(errorMessage);
      }
    })
  }
}