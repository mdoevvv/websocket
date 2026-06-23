import { useState } from "react";

import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";
function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [socketID, setSocketID] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3002/");
    socket.on("individual_user", (data) => {
      console.log(data);
    });

    socket.on("connect", () => {
      console.log("User is connected");
      setSocket(socket);
    });

    socket.on("personal-msg", (msg) => {
      setAllMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!socket) return;
    socket.emit("send-msg", { msg: message, id: socketID });
    setMessage("");
  };

  const roomJoinHandler = (e) => {
    e.preventDefault();
    if (!socket) return;
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="chat-header">
            CHAT APP
            <div className="socket-id">{socket?.id}</div>
          </div>

          <div className="messages">
            {allMessages.map((msg, i) => (
              <div key={i} className="msg recv">
                {msg}
              </div>
            ))}
          </div>

          <form onSubmit={submitHandler} className="input-area">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />

            <input
              value={socketID}
              onChange={(e) => setSocketID(e.target.value)}
              placeholder="Receiver Socket ID"
            />

            <button type="submit">Send</button>
          </form>

          <form onSubmit={roomJoinHandler} className="input-area">
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Room name"
            />
            <button type="submit">Join Room</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
