// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXCj-3sYnxSO0UPJw4IPSe6dhovDyrgJ4",
  authDomain: "notify-7abec.firebaseapp.com",
  projectId: "notify-7abec",
  storageBucket: "notify-7abec.firebasestorage.app",
  messagingSenderId: "613957802448",
  appId: "1:613957802448:web:81256159c4070e351e41d5",
  measurementId: "G-40G9N92V85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)