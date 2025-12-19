// Prompt for username (simple session identity)
const username = prompt("Enter your name");

// WebSocket connection
const ws = new WebSocket(`ws://${location.host}`);

// DOM references (query once)
const chat = document.getElementById("chat");
const usersList = document.getElementById("users");
const input = document.getElementById("msg");

// Send join event when connection opens
ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "join",
    user: username
  }));
};

// Handle incoming messages
ws.onmessage = (event) => {
  let data;

  try {
    data = JSON.parse(event.data);
  } catch {
    return; // ignore malformed data
  }

  // System messages (join / leave)
  if (data.type === "system") {
    const li = document.createElement("li");
    li.className = "system-message";
    li.textContent = data.text;
    chat.appendChild(li);
  }

  // Normal chat messages
  if (data.type === "msg") {
    const li = document.createElement("li");
    li.textContent = `${data.user}: ${data.text}`;
    chat.appendChild(li);
  }

  // Online users list update
  if (data.type === "users") {
    usersList.innerHTML = "";
    data.list.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user;
      usersList.appendChild(li);
    });
  }

  // Always scroll to latest message
  chat.scrollTop = chat.scrollHeight;
};

// Send message function
function send() {
  const text = input.value.trim();
  if (!text) return;

  ws.send(JSON.stringify({
    type: "msg",
    user: username,
    text
  }));

  input.value = "";
}

// Enter / Shift+Enter handling for textarea
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // prevent newline
    send();             // send message
  }
});
