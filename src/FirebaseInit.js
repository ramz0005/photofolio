// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2pM99ups3ecB5tS1EzUeOfFpVYFOyxi8",
  authDomain: "photofolio-5568f.firebaseapp.com",
  projectId: "photofolio-5568f",
  storageBucket: "photofolio-5568f.appspot.com",
  messagingSenderId: "170772426933",
  appId: "1:170772426933:web:b2b24fd2114074b51d4efc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);