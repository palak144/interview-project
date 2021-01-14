import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: RegisterModel = new RegisterModel();
  registerForm: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private userService: UserService,
    private toastr: ToastrService,

) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': [this.user.firstName, [
        Validators.required
      ]],
      'lastName': [this.user.lastName, [
        Validators.required,
      ]],
      'username': [this.user.username, [
        Validators.required,
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  onRegisterSubmit() {
    
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  
                  this.toastr.error('Registration Successful');
                    this.router.navigateByUrl('/login');
                },
                error => {
                  this.toastr.error(error);
                  ;
                });
  }

}
