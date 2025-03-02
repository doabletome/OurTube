import Video from "../Model/video.js";

//  Upload a Video
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    // Validate request data
    if (!title || !videoLink) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // Create a new video entry
    const newVideo = await Video.create({
      title,
      description,
      videoLink,
      videoType,
      thumbnail,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Upload Video Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  Get All Videos
export const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Get All Videos Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  Get Video by ID
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id).populate(
      "user",
      "channelName profilePic userName createdAt"
    );

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json({ success: true, video });
  } catch (error) {
    console.error("Get Video by ID Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Videos by User ID
export const getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;

    const videos = await Video.find({ user: userId }).populate(
      "user",
      "channelName profilePic userName createdAt about"
    );

    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.error("Get Videos by User ID Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//search video
export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Case-insensitive title search
        { description: { $regex: query, $options: "i" } }, // Case-insensitive description search
      ],
    }).populate("user", "channelName profilePic");

    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
