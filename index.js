// Required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const videoRoutes = require("./routes/videos");

// Configuration
dotenv.config();
const PORT = process.env.PORT || 8080;

// Initialize app
const app = express();

// Middleware setup
const configureMiddleware = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/", videoRoutes);
};

// Start server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

// Main function to setup and start the server
const main = () => {
  configureMiddleware();
  startServer();
};

main();
