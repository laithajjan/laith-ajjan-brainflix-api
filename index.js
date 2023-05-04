const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const videoRoutes = require("./routes/videos");

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

const configureMiddleware = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/", videoRoutes);
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

const main = () => {
  configureMiddleware();
  startServer();
};

main();
