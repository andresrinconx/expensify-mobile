// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth';
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGJCKh9U921B_jDXn72u_LSGMbSStbWu4",
  authDomain: "expensify-1b55a.firebaseapp.com",
  projectId: "expensify-1b55a",
  storageBucket: "expensify-1b55a.appspot.com",
  messagingSenderId: "930992140365",
  appId: "1:930992140365:web:dfcbe06e1aadbc10a02c04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app