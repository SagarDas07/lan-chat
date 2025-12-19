const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
  let file = "index.html";
  let type = "text/html";

  if (req.url === "/style.css") {
    file = "style.css";
    type = "text/css";
  } else if (req.url === "/chat.js") {
    file = "chat.js";
    type = "application/javascript";
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

const wss = new WebSocket.Server({ server });
const users = new Map(); // ws -> username

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN) c.send(msg);
  });
}

wss.on("connection", ws => {
  ws.on("message", message => {
    let data;
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    // First message = join
    if (data.type === "join") {
      users.set(ws, data.user);

      broadcast({
        type: "system",
        text: `→ ${data.user} joined the room`
      });

      broadcast({
        type: "users",
        list: [...users.values()]
      });

      return;
    }

    // Chat message
    if (data.type === "msg") {
      broadcast({
        type: "msg",
        user: data.user,
        text: data.text
      });
    }
  });

  ws.on("close", () => {
    const user = users.get(ws);
    if (!user) return;

    users.delete(ws);

    broadcast({
      type: "system",
      text: `← ${user} left the room`
    });

    broadcast({
      type: "users",
      list: [...users.values()]
    });
  });
});

server.listen(3000, () => {
  console.log("LAN Chat running on port 3000");
});
