const express = require("express");
const socket = require("socket.io");

const app = express();

const server = app.listen(3000, () => {
  console.log("server up on 3000 Dudes!");
});

//Static files
app.use(express.static("public"));

//Socket setup

const io = socket(server);

io.on("connection", socket => {
  console.log("Made socket connection", socket.id);
  socket.on("chat", data => {
    io.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
