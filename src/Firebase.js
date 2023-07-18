import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_CG8tKqhBvoURkcJ1jCCqaS8owa3AJ_o",
  authDomain: "chat-app-c266d.firebaseapp.com",
  projectId: "chat-app-c266d",
  storageBucket: "chat-app-c266d.appspot.com",
  messagingSenderId: "303787624329",
  appId: "1:303787624329:web:b1da310eabfd4f4fae4358",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
