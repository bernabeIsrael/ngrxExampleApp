import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const {name, email, password} = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then(credential => {
        console.log(credential);
        this.router.navigate(['/']);
      })
      .catch(err => console.log(err));
  }
}
