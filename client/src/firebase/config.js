// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
    EmailAuthProvider,
    FacebookAuthProvider,
    GoogleAuthProvider,
    getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGnKrFxyvi4jr5C24Shs2GKQSlwWijOH4",
    authDomain: "nitflex-cf3e6.firebaseapp.com",
    projectId: "nitflex-cf3e6",
    storageBucket: "nitflex-cf3e6.appspot.com",
    messagingSenderId: "1022847936651",
    appId: "1:1022847936651:web:4b0234acbc5c50aa768c8e",
    measurementId: "G-0G0KX9L716",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const emailProvider = new EmailAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
