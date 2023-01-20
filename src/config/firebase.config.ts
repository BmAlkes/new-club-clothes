import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGt2wdbqm1ylaJrRAc4MBfINwlzQ9ChaQ",
  authDomain: "new-club-4775b.firebaseapp.com",
  projectId: "new-club-4775b",
  storageBucket: "new-club-4775b.appspot.com",
  messagingSenderId: "473843258894",
  appId: "1:473843258894:web:5ad3d3e88d43dca8cd8e5f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
