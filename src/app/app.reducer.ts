import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as inputOutput from './input-output/input-output.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  inputOutput: inputOutput.State;
}


export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  inputOutput: inputOutput.inputOutputReducer,
};
