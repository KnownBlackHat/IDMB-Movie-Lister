// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_8eyW3hdYM_Ff4pnZoKS__pHh5lKVXUg",
    authDomain: "dummy-7d2df.firebaseapp.com",
    projectId: "dummy-7d2df",
    storageBucket: "dummy-7d2df.firebasestorage.app",
    messagingSenderId: "1008948484470",
    appId: "1:1008948484470:web:37279d7c87580e45160257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
