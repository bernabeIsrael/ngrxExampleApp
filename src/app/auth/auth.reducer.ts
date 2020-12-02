import {ActionReducer, createReducer, on} from '@ngrx/store';
import {setUser, unSetUser} from './auth.actions';
import {User} from '../models/user.model';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

const _uiReducer = createReducer(initialState,
  on(setUser, (state, {user}) => ({...state, user: {...user}})),
  on(unSetUser, state => ({...state, user: null})),
);

export function authReducer(state: any, action: any) {
  return _uiReducer(state, action);
}

