import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUfaKJULblx5ELNhVxau2F_PpvdCFYA-w",
  authDomain: "chat-app-fcaee.firebaseapp.com",
  projectId: "chat-app-fcaee",
  storageBucket: "chat-app-fcaee.firebasestorage.app",
  messagingSenderId: "511735990135",
  appId: "1:511735990135:web:500a061de4753132014372"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email
    });

    alert("Signup success!");
    window.location.href = "chat.html";

  } catch (error) {
    alert(error.message);
  }
});
