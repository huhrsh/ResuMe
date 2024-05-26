// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, setPersistence, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiG8EINjFlda1cKxS2cIhO0pq6I7Pj84Y",
  authDomain: "resume-384cc.firebaseapp.com",
  projectId: "resume-384cc",
  storageBucket: "resume-384cc.appspot.com",
  messagingSenderId: "1077746436531",
  appId: "1:1077746436531:web:8cf5f8d8f1876d3c04a3c6",
  measurementId: "G-B9H3QR8BM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage=getStorage(app)
setPersistence(auth, browserLocalPersistence);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { auth, db,provider,storage }