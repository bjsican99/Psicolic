// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5PYKSVjAVCJP0b_tXcMeTr-d4VnEYT1k",
  authDomain: "psicolic-8993f.firebaseapp.com",
  projectId: "psicolic-8993f",
  storageBucket: "psicolic-8993f.appspot.com",
  messagingSenderId: "15144877277",
  appId: "1:15144877277:web:aaa36cf85ee2bd190caf34"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);