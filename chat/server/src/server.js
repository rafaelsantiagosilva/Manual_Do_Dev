import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
  ws.on("error", console.error);

  ws.send(`> ${ws.client} is connected on server!`);

  ws.on("message", (data) => {
    wss.clients.forEach((client) => client.send(data.toString()));
    console.info(data.toString());
  });

  console.info("> Client connected");
});
