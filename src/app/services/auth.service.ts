import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) {
  }

  createUser(name: string, email: string, password: string): ReturnType<firebase.default.auth.Auth['createUserWithEmailAndPassword']> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string): ReturnType<firebase.default.auth.Auth['signInWithEmailAndPassword']> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(): ReturnType<firebase.default.auth.Auth['signOut']> {
    return this.auth.signOut();
  }
}
