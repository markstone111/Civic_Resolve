// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdjEi3wm15PeJW3D7wUnqV7A0T0a_YmtY",
  authDomain: "civicissuereportingapp.firebaseapp.com",
  projectId: "civicissuereportingapp",
  storageBucket: "civicissuereportingapp.firebasestorage.app",
  messagingSenderId: "690861849074",
  appId: "1:690861849074:web:30e8231c61d5fcfd6f536b",
  measurementId: "G-9YLVTHJCKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};