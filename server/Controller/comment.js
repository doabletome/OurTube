import Comment from "../Model/comment.js"; // Ensure correct model path

// Add a new comment
export const addComment = async (req, res) => {
  try {
    // Extract comment details from request body
    const { videoId, message } = req.body;

    // Validate request data
    if (!videoId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new comment
    const newComment = await Comment.create({
      video: videoId,
      user: req.user._id,
      message: message,
    });

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  Get comments by video ID
export const getCommentByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;

    // Find comments related to the given video ID
    const comments = await Comment.find({ video: videoId })
      .sort({
        createdAt: -1,
      })
      .populate("user", "channelName profilePic userName createdAt");

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// edit comment
export const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { message } = req.body;

    // Find and update comment
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { message },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ success: true, updatedComment });
  } catch (error) {
    console.error("Error editing comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId || commentId.length !== 24) {
      return res.status(400).json({ error: "Invalid Comment ID" });
    }
    // Find and delete comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};
