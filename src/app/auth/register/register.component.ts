import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Wait a moment plz',
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    const {name, email, password} = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then(credential => {
        console.log(credential);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }
}
