import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';

import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as inputOutputActions from '../input-output/input-output.actions';

import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private _user: User | null;

  get user(): User | null {
    return this._user;
  }

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) {
    this._user = null;
  }

  initAuthListener(): void {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe(fireStoreUser => {
            const user = User.fromFirebase(fireStoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({user}));
          });
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(inputOutputActions.unSetItems());
      }
    });
  }

  createUser(name: string, email: string, password: string): Promise<void> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {

        if (!user || !user.email) {
          return;
        }

        const newUser = new User(user.uid, user.email, name);

        return this.firestore.doc(`${user.uid}/user`)
          .set({...newUser});

      });
  }

  loginUser(email: string, password: string): ReturnType<firebase.default.auth.Auth['signInWithEmailAndPassword']> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(): ReturnType<firebase.default.auth.Auth['signOut']> {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
