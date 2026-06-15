import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "watchwave-fadc8.firebaseapp.com",
  projectId: "watchwave-fadc8",
  storageBucket: "watchwave-fadc8.firebasestorage.app",
  messagingSenderId: "91176205178",
  appId: "1:91176205178:web:8f32e564c1537497b6f4c3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
