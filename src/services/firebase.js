import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnFSJCWkBCb1ge3gieWwNIyJDBNGyskHE",
    authDomain: "carebridge-app-5ea58.firebaseapp.com",
    projectId: "carebridge-app-5ea58",
    storageBucket: "carebridge-app-5ea58.firebasestorage.app",
    messagingSenderId: "296513198593",
    appId: "1:296513198593:web:4307a5488459eba86f7e00"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;