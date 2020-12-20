import {ActionReducer, createReducer, on} from '@ngrx/store';
import {setItems, unSetItems} from './input-output.actions';
import {InputOutput} from '../models/input-output.model';
import {AppState} from '../app.reducer';

export interface State {
  items: InputOutput[];
}

export interface AppStateWithInput extends AppState {
  inputOutput: State;
}

export const initialState: State = {
  items: [],
};

const _inputOutputReducer = createReducer(initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items]})),
  on(unSetItems, (state) => ({...state, items: []})),
);

export function inputOutputReducer(state: any, action: any) {
  return _inputOutputReducer(state, action);
}

