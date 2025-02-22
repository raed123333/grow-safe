const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db"); 
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Node.js + Express + MySQL API!");
});

// Sync Database & Start Server
sequelize
  .sync({ force: false }) // Use force: true ONLY in development (drops & recreates tables)
  .then(() => console.log(" Database & tables synced"))
  .catch((err) => console.error(" Sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
