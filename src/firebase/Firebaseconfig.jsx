import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCD3tSbPlt4pliUVyDplL9ziVaQ-spzYfg",
  authDomain: "fir-auth-2ec72.firebaseapp.com",
  projectId: "fir-auth-2ec72",
  storageBucket: "fir-auth-2ec72.appspot.com",
  messagingSenderId: "257635474598",
  appId: "1:257635474598:web:0124b013f16e97d30c6867",
  measurementId: "G-Z29RWM8H7X"
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app); 

export { app, Auth, firestore, storage };
