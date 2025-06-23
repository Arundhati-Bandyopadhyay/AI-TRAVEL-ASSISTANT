// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNsBcx1CDbY8_wxDrX-VhWQTCS4vdsIAw",
  authDomain: "tripassistant-ab511.firebaseapp.com",
  projectId: "tripassistant-ab511",
  storageBucket: "tripassistant-ab511.firebasestorage.app",
  messagingSenderId: "8018361580",
  appId: "1:8018361580:web:907470e4a11ada5a9879c9",
  measurementId: "G-P97DM2LJXS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);