import "firebase/firestore";
import "firebase/auth";

import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKuBeB9gIL19IcxziKWu781zRDR3b9a_c",
  authDomain: "react-journal-app-82979.firebaseapp.com",
  projectId: "react-journal-app-82979",
  storageBucket: "react-journal-app-82979.appspot.com",
  messagingSenderId: "593791730332",
  appId: "1:593791730332:web:13adf5ece97b2f3145a359",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {db, googleAuthProvider};
