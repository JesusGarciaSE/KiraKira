// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmeuFyhertoJLZoQ4BHNEW_bKY3jpbVUg",
  authDomain: "kirakirallc.firebaseapp.com",
  projectId: "kirakirallc",
  storageBucket: "kirakirallc.appspot.com",
  messagingSenderId: "831528000447",
  appId: "1:831528000447:web:303cf7b63ff5aeaec49f0a",
  measurementId: "G-QVHZPLKQMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
export const functions = getFunctions(app)
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
// const analytics = getAnalytics(app);
