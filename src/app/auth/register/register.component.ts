import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

import {Subscription} from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe(uiState => {
        this.loading = uiState.isLoading;
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const {name, email, password} = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then(credential => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
      });
  }
}
