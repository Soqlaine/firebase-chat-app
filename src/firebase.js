import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDrhIKDQ8uiazixeZ1l31DDeNI5Cq80U34",
    authDomain: "chat-app-5bf12.firebaseapp.com",
    projectId: "chat-app-5bf12",
    storageBucket: "chat-app-5bf12.firebasestorage.app",
    messagingSenderId: "923236675066",
    appId: "1:923236675066:web:f3668f1851118da436c843"
  };  

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
