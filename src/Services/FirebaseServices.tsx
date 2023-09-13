// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
// const analytics = getAnalytics(app);

//Test email asdf@gmail.com and password asdf1234
export const loginWithEmailandPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed Out Successful");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};