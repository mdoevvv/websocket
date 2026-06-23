import { useState } from "react";

import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";
function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [socketID, setSocketID] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3002/");
    socket.on("individual_user", (data) => {
      console.log(data);
    });

    socket.on("connect", () => {
      console.log("User is connected");
      setSocket(socket);
    });

    socket.on("personal-msg", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    socket.emit("send-msg", { msg: message, id: socketID });
    setMessage("");
  };

  return (
    <>
      <h2>CHAT APP</h2>

      <form onSubmit={submitHandler}>
        {socket?.id}
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter Text: "
        />
        <button type="submit">Send Message</button>

        <input
          type="text"
          value={socketID}
          onChange={(e) => {
            setSocketID(e.target.value);
          }}
          placeholder="Enter RoomID"
        />
      </form>
    </>
  );
}

export default App;
