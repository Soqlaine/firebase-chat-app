import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMsg.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      text: newMsg,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
    });

    setNewMsg("");
  };

  return (
    <>
      <main style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.displayName}: </strong>
            {msg.text}
          </p>
        ))}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
