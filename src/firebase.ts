// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "peer-interviewer.firebaseapp.com",
  projectId: "peer-interviewer",
  storageBucket: "peer-interviewer.firebasestorage.app",
  messagingSenderId: "1018781392403",
  appId: "1:1018781392403:web:6eafd4bfe2744e4c9da9e6",
  measurementId: "G-2QVR06X4TD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
