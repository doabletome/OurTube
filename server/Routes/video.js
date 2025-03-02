import express from "express";
import {
  uploadVideo,
  getAllVideo,
  getVideoById,
  getAllVideoByUserID,
  searchVideos,
} from "../Controller/video.js";
import auth from "../Middleware/authentication.js";

const router = express.Router();

//  Upload a new video (Requires authentication)
router.post("/video", auth, uploadVideo);

// Get all videos
router.get("/allVideo", getAllVideo);

// Get a video by its ID
router.get("/getVideoById/:id", getVideoById);

//  Get all videos by a specific user (channel)
router.get("/:userId/channel", getAllVideoByUserID);
// search video
router.get("/search", searchVideos);

export default router;
