import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBT4oWmp0QJseMnKd9ozMuKf8xRN16XIZ4",
  authDomain: "chat-app-234e9.firebaseapp.com",
  projectId: "chat-app-234e9",
  storageBucket: "chat-app-234e9.appspot.com",
  messagingSenderId: "1018487379656",
  appId: "1:1018487379656:web:8c55978d14772c877e37fd",
  measurementId: "G-JZN12ZR298"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();