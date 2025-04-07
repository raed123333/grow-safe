const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const Messenger = require("./models/Messenger"); // Import Messenger model
const parentRoutes = require("./routes/parentRoutes");
const enfantRoutes = require("./routes/enfantRoutes");
const messengerRoutes = require("./routes/messengerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const donneeRoutes = require("./routes/donneeRoutes");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server to handle Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins (adjust for production)
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/parents", parentRoutes);
app.use("/enfants", enfantRoutes);
app.use("/messengers", messengerRoutes);
app.use("/notifications", notificationRoutes);
app.use("/donnees", donneeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js + Express + MySQL API!");
});

// Define socket events
// In your server.js (backend)
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle joining rooms
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Handle sending messages
  socket.on("sendMessage", async (data) => {
    try {
      const { sender_id, receiver_id, message } = data;
      
      // Save to database
      const newMessage = await Messenger.create({
        sender_id,
        receiver_id,
        sender_type: sender_id.startsWith("parent") ? "parent" : "enfant",
        message
      });

      // Emit to both sender and receiver rooms
      io.to(sender_id).to(receiver_id).emit("receiveMessage", newMessage);
      
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("errorMessage", "Error sending message");
    }
  });

  // Handle message history requests
  socket.on("getMessageHistory", async ({ userId, otherUserId }) => {
    try {
      const messages = await Messenger.findAll({
        where: {
          [Op.or]: [
            { sender_id: userId, receiver_id: otherUserId },
            { sender_id: otherUserId, receiver_id: userId }
          ]
        },
        order: [["message_time", "ASC"]]
      });
      socket.emit("messageHistory", messages);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
// Sync database without forcing reset (to prevent data loss)
sequelize
  .sync({ force: false })
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error("Sync error:", err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
