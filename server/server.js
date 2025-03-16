const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const parentRoutes = require("./routes/parentRoutes");
const enfantRoutes = require("./routes/enfantRoutes");
const messengerRoutes = require("./routes/messengerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const donneeRoutes = require("./routes/donneeRoutes");
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server to handle Socket.io
const io = socketIo(server); // Attach Socket.io to the HTTP server

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cors());
app.use(express.json());

app.use("/parents", parentRoutes);
app.use("/enfants", enfantRoutes);
app.use("/messengers", messengerRoutes);
app.use("/notifications", notificationRoutes);
app.use("/donnees", donneeRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Node.js + Express + MySQL API!");
});

// Define socket events
io.on("connection", (socket) => {
  console.log("A user connected");
  
  // Listen for the 'sendMessage' event from frontend
  socket.on("sendMessage", async (msgData) => {
    try {
      // Save the message to the database
      const newMessenger = await Messenger.create(msgData);
      
      // Emit the message to the other user
      socket.to(msgData.reciever_id).emit("receiveMessage", newMessenger);
      
      // Emit back to the sender as well (optional, can be adjusted based on your use case)
      socket.emit("receiveMessage", newMessenger);
    } catch (error) {
      console.error(error);
    }
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

sequelize
.sync({ force: false }) // Sync the database (make sure you don't lose data)
.then(() => console.log("Database & tables synced"))
.catch((err) => console.error("Sync error:", err));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

