import {Component, OnDestroy, OnInit} from '@angular/core';

import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

import {InputOutput} from '../../models/input-output.model';
import {InputOutputService} from '../../services/input-output.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  inputOutput: InputOutput[] = [];
  inputOutputSubs = new Subscription();

  constructor(private store: Store<AppState>,
              private inputOutputService: InputOutputService) {

  }

  ngOnInit(): void {
    this.inputOutputSubs = this.store.select('inputOutput')
      .subscribe(({items}) => this.inputOutput = items);
  }

  ngOnDestroy(): void {
    this.inputOutputSubs.unsubscribe();
  }

  delete(uid: string | undefined): void {
    if (!uid) {
      return;
    }
    this.inputOutputService
      .deleteInputOuputItem(uid)
      .then(() => Swal.fire('Deleted', 'Item deleted', 'success'))
      .catch((error) => Swal.fire('Error', error.message, 'error'));
    console.log(uid);
  }
}
