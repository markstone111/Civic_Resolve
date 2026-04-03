import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };