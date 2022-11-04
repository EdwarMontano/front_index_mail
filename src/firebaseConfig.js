// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCV3_HINsIJ2HMrvGcLKXrSpjvpbGmcJI",
  authDomain: "indexmail-3f268.firebaseapp.com",
  projectId: "indexmail-3f268",
  storageBucket: "indexmail-3f268.appspot.com",
  messagingSenderId: "1096612276047",
  appId: "1:1096612276047:web:efed7512b536f5d06bc73a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth()

export { auth }