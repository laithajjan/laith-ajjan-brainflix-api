// Import necessary modules
const express = require("express");
const fs = require("fs");
const router = express.Router();
VideoDetails = require("../data/video-details.json");

// Middleware for router
router.use((req, res, next) => {
    next();
});

// Route for the Express homepage
router.get("/", (req, res) => {
    res.send("Express Homepage");
});

// Route for fetching all videos
router.get("/videos", (req, res) => {
    let video_data = fs.readFileSync("data/video-details.json");
    let parse_video_data = JSON.parse(video_data);
    res.json(parse_video_data);
});

// Route for fetching a specific video by ID
router.get("/videos/:videoId", (req, res) => {
    const videoId = req.params.videoId;
    let video_data = fs.readFileSync("data/video-details.json");
    let parse_video_data = JSON.parse(video_data);
    let currentVideoDetails = parse_video_data.find(video => video.id === videoId);
    res.json(currentVideoDetails);
});

// Route for posting a new video
router.post("/videos", (req, res) => {
    let new_data = (req.body);
    let video_data = fs.readFileSync("data/video-details.json");
    let parse_video_data = JSON.parse(video_data);
    parse_video_data.push(new_data);
    let stringify_video_data = JSON.stringify(parse_video_data);
    fs.writeFileSync('data/video-details.json', stringify_video_data);
    res.status(201).send("Created New Video");
});

// Export the router module
module.exports = router;
