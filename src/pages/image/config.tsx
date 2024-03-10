// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQDzrW2mWlZ4JYjBqI-cmmcuKSQEx-Z2w",
  authDomain: "project-adw.firebaseapp.com",
  databaseURL: "https://project-adw-default-rtdb.firebaseio.com",
  projectId: "project-adw",
  storageBucket: "project-adw.appspot.com",
  messagingSenderId: "432161617519",
  appId: "1:432161617519:web:676549153358a72675bf9a",
  measurementId: "G-NYNKTVFQWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imgDB = getStorage(app);