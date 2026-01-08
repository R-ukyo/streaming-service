const { Server } = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const HISTORY_FILE = path.join(__dirname, "chat-history.json");

if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify([]));
}

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    path: "/chat-socket/"
});

io.on("connection", (socket) => {
    const userId = `Guest-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    console.log(`User connected: ${socket.id} (assigned as ${userId})`);

    socket.emit("assign id", userId);

    try {
        const history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
        socket.emit("chat history", history);
    } catch (err) {
        console.error("Error reading history file:", err);
    }

    socket.on("chat message", (msg) => {
        const messageWithUser = {
            ...msg,
            user: userId,
            timestamp: Date.now()
        };

        console.log("message from " + userId + ": " + JSON.stringify(messageWithUser));

        try {
            const history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
            history.push(messageWithUser);
            fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
        } catch (err) {
            console.error("Error saving message to history:", err);
        }

        io.emit("chat message", messageWithUser);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Chat server listening on port ${PORT}`);
});
