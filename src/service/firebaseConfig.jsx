// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRJvVypXIQcNa5VBWGyFKx1JaH9qAQluo",
  authDomain: "my-projects-20756.firebaseapp.com",
  projectId: "my-projects-20756",
  storageBucket: "my-projects-20756.firebasestorage.app",
  messagingSenderId: "666984819513",
  appId: "1:666984819513:web:5485a7e64b1da5786f96e8",
  measurementId: "G-PYCGY3P8DL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);
// const analytics = getAnalytics(app);