const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/general.css", function (req, res) {
  res.sendFile(__dirname + "/" + "general.css");
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("color-message", (msg) => {
    // console.log("color-message", msg);
    io.emit("color-message", msg);
  });
  socket.on("settings", (msg) => {
    io.emit("settings", msg);
  });
});

server.listen(8080, () => {
  console.log("listening on *:8080");
});
