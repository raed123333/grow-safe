const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db"); 
const parentRoutes = require("./routes/parentRoutes");
const enfantRoutes=require("./routes/enfantRoutes");
const messengerRoutes=require("./routes/messengerRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const donneeRoutes =require("./routes/donneeRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/parents", parentRoutes);
app.use("/enfants",enfantRoutes);
app.use("/messengers",messengerRoutes);
app.use("/notifications",notificationRoutes);
app.use("/donnees",donneeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js + Express + MySQL API!");
});

// Sync Database & Start Server
sequelize
  .sync({ force: false }) 
  .then(() => console.log(" Database & tables synced"))
  .catch((err) => console.error(" Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
