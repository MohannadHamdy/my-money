// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "mymoney-58349.firebaseapp.com",
  projectId: "mymoney-58349",
  storageBucket: "mymoney-58349.appspot.com",
  messagingSenderId: "350445416463",
  appId: "1:350445416463:web:6717f8e1afbecb1897b37a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// init Auth
const auth = getAuth();

export { app, db, auth };
