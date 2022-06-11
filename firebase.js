// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOPj87pSiG38I7NTyY37tmcRu9mC5HdyA",
  authDomain: "tshigzung.firebaseapp.com",
  projectId: "tshigzung",
  storageBucket: "tshigzung.appspot.com",
  messagingSenderId: "127763536857",
  appId: "1:127763536857:web:ffdf27535abfd50a2517c8"
};

// Initialize Firebase
const app= initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default getFirestore();