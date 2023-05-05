const express = require("express");
const fs = require("fs").promises;
const routes = express.Router();
const videoDataPath = "data/video-details.json";

const handleErrors = (error, res, message) => {
  console.error(error);
  res.status(500).send(message);
};

const readAndParseVideoData = async () => {
  try {
    const videoInfoData = await fs.readFile(videoDataPath, "utf8");
    return JSON.parse(videoInfoData);
  } catch (error) {
    throw new Error("Error reading video data");
  }
};

const writeVideoData = async (parsedVideoInfo) => {
  try {
    const stringifiedVideoInfo = JSON.stringify(parsedVideoInfo, null, 2);
    await fs.writeFile(videoDataPath, stringifiedVideoInfo);
  } catch (error) {
    throw new Error("Error writing video data");
  }
};

routes.get("/", (req, res) => res.send("Express Main Page"));

routes.get("/videos", async (req, res) => {
  try {
    res.json(await readAndParseVideoData());
  } catch (error) {
    handleErrors(error, res, error.message);
  }
});

routes.get("/videos/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const parsedVideoInfo = await readAndParseVideoData();
    const selectedVideo = parsedVideoInfo.find(video => video.id === videoId);

    selectedVideo
      ? res.json(selectedVideo)
      : res.status(404).send("Video not found");
  } catch (error) {
    handleErrors(error, res, error.message);
  }
});

routes.post("/videos", async (req, res) => {
  try {
    const newData = req.body;
    const parsedVideoInfo = await readAndParseVideoData();
    parsedVideoInfo.push(newData);
    await writeVideoData(parsedVideoInfo);
    res.status(201).send("New Video Added");
  } catch (error) {
    handleErrors(error, res, error.message);
  }
});

module.exports = routes;
