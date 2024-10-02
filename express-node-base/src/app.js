const express = require("express");
require("dotenv").config();
const setupAssociations = require("./models/Associate"); // Ensure the path is correct

const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routers"); // Import routes
const sequelize = require("./configs/connections/postgresql");

const { consumeMessages } = require('./kafka/consumer');

const app = express();

setupAssociations();
// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database synchronization failed:", err));


  const topic = 'student-updates';  // Set the topic you want to consume
  consumeMessages(topic).catch(console.error);  // Start the consumer
// Use routes
app.use("/api", routes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
