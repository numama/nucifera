import firebase from 'firebase';
import 'firebase/firestore';
import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDb = firebase.firestore();
export const firebaseAuth = firebase.auth();
