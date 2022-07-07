// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_APIKEY,
  authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
  projectId: "mymoney-58349",
  storageBucket: "mymoney-58349.appspot.com",
  messagingSenderId: "350445416463",
  appId: process.env.REACT_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
