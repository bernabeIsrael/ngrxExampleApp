import {createAction, props} from '@ngrx/store';
import {InputOutput} from '../models/input-output.model';

export const unSetItems = createAction('[InputOutput Component] Unset Items');
export const setItems = createAction(
  '[InputOutput Component] Set Items',
  props<{ items: InputOutput[] }>()
);
