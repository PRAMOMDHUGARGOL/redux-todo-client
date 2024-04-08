// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5XVkCdd_NKcBgODPtvUB36zFvWpkqb0k",
  authDomain: "alltramatic-101.firebaseapp.com",
  projectId: "alltramatic-101",
  storageBucket: "alltramatic-101.appspot.com",
  messagingSenderId: "643874624202",
  appId: "1:643874624202:web:3e7269633fe8b433c81a33",
  measurementId: "G-FMP3BLHCEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
