import { Server } from "socket.io";
import http from "http";
import express from "express";
import { frontendUrl } from "../../secret.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [frontendUrl],
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("An user connected", socket.id);
  
  socket.on("disconnect",()=>{
      console.log("An user disconnected", socket.id);

  })
});

export { io, app, server };
