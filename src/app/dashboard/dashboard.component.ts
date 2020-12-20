import {Component, OnDestroy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as inputsOutputsActions from '../input-output/input-output.actions';

import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

import {InputOutputService} from '../services/input-output.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs = new Subscription();
  inputOutputSubs = new Subscription();

  constructor(private store: Store<AppState>,
              private inputOutputService: InputOutputService) {
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => {
          return auth.user != null;
        })
      )
      .subscribe(({user}) => {
        if (user) {
          this.inputOutputSubs = this.inputOutputService.initInputsOutputsListener(user.uid)
            .subscribe(inputsOutputsFirebase => {

              this.store.dispatch(inputsOutputsActions.setItems({items: inputsOutputsFirebase}));

            });
        }
      });

  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.inputOutputSubs.unsubscribe();
  }

}
