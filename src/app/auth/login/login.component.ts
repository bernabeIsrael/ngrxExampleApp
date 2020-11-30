import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const {email, password} = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.loginUser(email, password)
      .then(credentials => {
        this.router.navigate(['/']);
        console.log(credentials);
      })
      .catch(err => console.log(err));
  }
}
