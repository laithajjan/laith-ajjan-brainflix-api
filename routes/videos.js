const express = require("express");
const fs = require("fs").promises;
const routes = express.Router();
const videoDataPath = "data/video-details.json";

// Middleware for routes
routes.use((request, response, next) => {
    next();
});

// Express main page route
routes.get("/", (request, response) => {
    response.send("Express Main Page");
});

// Function to read and parse video data
async function readAndParseVideoData() {
    const videoInfoData = await fs.readFile(videoDataPath, "utf8");
    return JSON.parse(videoInfoData);
}

// Function to write video data
async function writeVideoData(parsedVideoInfo) {
    const stringifiedVideoInfo = JSON.stringify(parsedVideoInfo, null, 2);
    await fs.writeFile(videoDataPath, stringifiedVideoInfo);
}

// Route to get all video details
routes.get("/videos", async (request, response) => {
    try {
        const parsedVideoInfo = await readAndParseVideoData();
        response.json(parsedVideoInfo);
    } catch (error) {
        console.error(error);
        response.status(500).send("Error reading video data");
    }
});

// Route to get video details by ID
routes.get("/videos/:id", async (request, response) => {
    try {
        const videoId = request.params.id;
        const parsedVideoInfo = await readAndParseVideoData();
        const selectedVideo = parsedVideoInfo.find(video => video.id === videoId);

        if (selectedVideo) {
            response.json(selectedVideo);
        } else {
            response.status(404).send("Video not found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("Error reading video data");
    }
});

// Route to add a new video
routes.post("/videos", async (request, response) => {
    try {
        const newData = (request.body);
        const parsedVideoInfo = await readAndParseVideoData();
        parsedVideoInfo.push(newData);
        await writeVideoData(parsedVideoInfo);
        response.status(201).send("New Video Added");
    } catch (error) {
        console.error(error);
        response.status(500).send("Error adding new video");
    }
});

// Export the routes module
module.exports = routes;
