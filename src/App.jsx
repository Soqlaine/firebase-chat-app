import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import ChatRoom from "./ChatRoom";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      <Auth user={user} setUser={setUser} />
      {user && <ChatRoom />}
    </div>
  );
}

export default App;
