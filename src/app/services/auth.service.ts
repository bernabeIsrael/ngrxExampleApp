import {Injectable} from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) {
  }

  initAuthListener(): void {
    this.auth.authState.subscribe(firebaseUser => {

      console.log(firebaseUser);
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);

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
