import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// ✅ Firebase Config — COPY EXACTLY
const firebaseConfig = {
  apiKey: "AIzaSyDUfaKJULblx5ELNhVxau2F_PpvdCFYA-w",
  authDomain: "chat-app-fcaee.firebaseapp.com",
  projectId: "chat-app-fcaee",
  storageBucket: "chat-app-fcaee.firebasestorage.app",
  messagingSenderId: "511735990135",
  appId: "1:511735990135:web:500a061de4753132014372"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const usersListDiv = document.getElementById("usersList");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const usersSnap = await getDocs(collection(db, "users"));
  usersSnap.forEach((doc) => {
    const u = doc.data();
    
    if (u.uid === user.uid) return; // Don't show yourself

    const userDiv = document.createElement("div");
    userDiv.innerHTML = `<button>${u.email}</button>`;
    userDiv.style.margin = "10px";

    userDiv.onclick = () => {
      window.location.href = `chat.html?uid=${u.uid}`;
    };

    usersListDiv.appendChild(userDiv);
  });
});
