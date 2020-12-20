import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputOutput} from '../models/input-output.model';
import {InputOutputService} from '../services/input-output.service';

import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as ui from '../shared/ui.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styles: []
})
export class InputOutputComponent implements OnInit, OnDestroy {

  form: FormGroup;
  type = 'input';
  loading = false;

  loadingSubscruption = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private inputOutputService: InputOutputService,
              private store: Store<AppState>) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadingSubscruption = this.store.select('ui')
      .subscribe(({isLoading}) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.loadingSubscruption.unsubscribe();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    const {description, amount} = this.form.value;
    const inputOutput = new InputOutput(description, amount, this.type);

    this.store.dispatch(ui.isLoading());

    this.inputOutputService.storeInputOutput(inputOutput)
      .then((ref) => {
        this.form.reset();
        this.store.dispatch(ui.stopLoading());
      })
      .catch(err => this.store.dispatch(ui.stopLoading()));
  }
}
