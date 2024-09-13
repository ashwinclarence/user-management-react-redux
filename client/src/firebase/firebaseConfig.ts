// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDGYeCFUy0FQ605_eyAeCWf7k_1xwla0Gk",
  authDomain: "redux-811a1.firebaseapp.com",
  projectId: "redux-811a1",
  storageBucket: "redux-811a1.appspot.com",
  messagingSenderId: "597881273655",
  appId: "1:597881273655:web:ffd709aabe4da2a25caeb2",
  measurementId: "G-J1NCB01BP1"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);