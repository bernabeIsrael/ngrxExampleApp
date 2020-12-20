import {Injectable} from '@angular/core';
import 'firebase/firestore';
import {AngularFirestore} from '@angular/fire/firestore';
import {InputOutput} from '../models/input-output.model';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class InputOutputService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  storeInputOutput(inputOutput: InputOutput): Promise<DocumentReference<DocumentData>> {
    const uid = this.authService.user?.uid;
    delete inputOutput.uid;

    return this.firestore.doc(`${uid}/input-output`)
      .collection('items')
      .add({...inputOutput});
  }

  initInputsOutputsListener(uid: string): Observable<any[]> {
    return this.firestore.collection(`${uid}/input-output/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => {
          return snapshot.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          }));
        })
      );
  }

  deleteInputOuputItem(uidItem: string): Promise<void> {
    const uid = this.authService.user?.uid;
    return this.firestore.doc(`/${uid}/input-output/items/${uidItem}`).delete();
  }
}
