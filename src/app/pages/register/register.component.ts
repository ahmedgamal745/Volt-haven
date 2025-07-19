import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {   NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../core/services/auth.service';
import { RegisterData } from '../../core/interfaces/register-data';
import {  Router, RouterLinkActive} from '@angular/router';
import { ErorrMessageService } from '../../core/services/erorr-message.service';
import { SharedModuleModule } from '../../shared/sharedModule/shared-module/shared-module.module';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModuleModule,RouterLinkActive],
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
    private router: Router,
    private userData:UserDataService
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
      this.MEroror.showError('Please fill in all required fields correctly.')
      return;
    } else {
      this.userRegister(this.registrationForm.value);
    }
  }

  userRegister(data: RegisterData): void {
    this.loadingSpinner.show();
    this.auth.userRegister(data).subscribe({
      next: (res) => {
        this.MEroror.showSuccess('Registration successful!');
        this.loadingSpinner.hide();
        this.userData.userName.next(res.name)
        localStorage.setItem('username',res.name)
        const {email, password} = data 
        this.auth.userLogin({email,password}).subscribe((next)=>{
          localStorage.setItem('token',res._id)
          this.router.navigate(['/user'])
        })
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
