# LAN Chat

A simple real-time chat application for local area networks (LAN) using WebSockets.

## Features

- Real-time messaging
- User join/leave notifications
- Online users list
- Simple web interface
- No external dependencies for clients

## Prerequisites

- Node.js (version 14 or higher)

## Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

Start the server:

```bash
node server.js
```

The chat will be available at `http://localhost:3000` on your local machine. To access it from other devices on the same WiFi network, use your machine's IP address instead of `localhost`.

### Finding Your IP Address

- **Windows**: Open Command Prompt and run `ipconfig`. Look for "IPv4 Address" under your network adapter (usually something like 192.168.1.xxx).
- **macOS/Linux**: Open Terminal and run `ifconfig` or `ip addr show`. Look for your local IP (e.g., 192.168.1.xxx).

Example: If your IP is `192.168.1.100`, the chat room will be available at `http://192.168.1.100:3000`.

## Usage

1. Start the server on one device (the host)
2. On any device connected to the same WiFi network (phones, tablets, other computers), open a web browser and navigate to the host's IP address with port 3000 (e.g., `http://192.168.1.100:3000`)
3. Enter your name when prompted
4. Start chatting!

## Files

- `server.js` - Node.js server with WebSocket handling
- `index.html` - Main HTML page
- `chat.js` - Client-side JavaScript for chat functionality
- `style.css` - Styling for the chat interface
- `package.json` - Node.js dependencies

## License

ISC