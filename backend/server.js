console.log("SERVER FILE STARTED");
const express = require("express");
const PORT = 3002;
const cors = require("cors");
const app = express();
const socketIO = require("socket.io");
const http = require("http");

const server = http.createServer(app);
app.use(cors());
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED", socket.id);
  // for all entries, io.emit("conMsg", "EMIT USER MESSAGE");
  socket.emit("individual_user", `ONLY THIS USER ${socket.id}`);
  // socket.broadcast.emit for everyone except the current individual

  socket.on("send-msg", (data) => {
    socket.to(data.id).emit("personal-msg", data.msg);
  });
});

server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
