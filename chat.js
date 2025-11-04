// ✅ Firebase imports (v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, onSnapshot,
  serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDUfaKJULblx5ELNhVxau2F_PpvdCFYA-w",
  authDomain: "chat-app-fcaee.firebaseapp.com",
  projectId: "chat-app-fcaee",
  storageBucket: "chat-app-fcaee.firebasestorage.app",
  messagingSenderId: "511735990135",
  appId: "1:511735990135:web:500a061de4753132014372"
};

// ✅ Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ FIXED

let currentUser = null;
let otherUser = "";

// ✅ Create chat ID
function getChatId(uid1, uid2) {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
}

// ✅ Send message
async function sendMessage(fromUid, toUid, text) {
  const chatId = getChatId(fromUid, toUid);
  await addDoc(collection(db, `chats/${chatId}/messages`), {
    from: fromUid,
    to: toUid,
    text,
    time: serverTimestamp()
  });
}

// ✅ Listen messages
function listenChat(uid1, uid2) {
  const chatId = getChatId(uid1, uid2);
  const q = query(collection(db, `chats/${chatId}/messages`), orderBy("time"));

  onSnapshot(q, snapshot => {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
      const m = doc.data();
      chatBox.innerHTML += `<p><b>${m.from === uid1 ? "You" : "Them"}:</b> ${m.text}</p>`;
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// ✅ Auth listener
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUser = user.uid;
  console.log("Logged in as:", currentUser);

  // ✅ TEMP — set the other user's UID for testing
  // otherUser = "8RtRWeYQntVDAb9pbCJZtURPFOo1"; // user 2 id
  // otherUser = "NN4XZQe0I0ZZKKdrtMUik2jnNzq1"; // user 1 id
  // Get other user UID from URL
  const params = new URLSearchParams(window.location.search);
  otherUser = params.get("uid");

  if (!otherUser) {
  alert("No user selected to chat with!");
  window.location.href = "users.html";
}



  listenChat(currentUser, otherUser);

  document.getElementById("sendBtn").onclick = () => {
    const input = document.getElementById("messageInput");
    if (!input.value.trim()) return;
    sendMessage(currentUser, otherUser, input.value);
    input.value = "";
  };
});
