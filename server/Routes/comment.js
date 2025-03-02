import express from "express";
import {
  addComment,
  getCommentByVideoId,
  editComment,
  deleteComment,
} from "../Controller/comment.js";
import auth from "../Middleware/authentication.js";

const router = express.Router();

// Add a comment (Requires authentication)
router.post("/comment", auth, addComment);

// Get comments for a specific video
router.get("/comment/:videoId", getCommentByVideoId);

// Edit Comment
router.put("/comment/:commentId", auth, editComment);

//  Delete Comment
router.delete("/comment/:commentId", auth, deleteComment);

export default router;
