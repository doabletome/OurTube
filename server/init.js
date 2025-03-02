import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./Model/user.js";
import Comment from "./Model/comment.js";
import Video from "./Model/video.js";
import bcrypt from "bcryptjs";

dotenv.config();
async function seedDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection to db successfull");

    // delete all previous data
    await User.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});
    console.log("Old Data Removed");

    // created user
    const users = await User.insertMany([
      {
        channelName: "demo Channel 1",
        userName: "demo user 1",
        password: await bcrypt.hash("password123", 10),
        about: "Exploring the latest in tech!",
        profilePic:
          "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.2065219596.1711430494&semt=ais_hybrid",
      },
      {
        channelName: "demo Channel 2",
        userName: "demo user 2",
        password: await bcrypt.hash("password123", 10),
        about: "Exploring the latest in tech!",
        profilePic:
          "https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?ga=GA1.1.2065219596.1711430494&semt=ais_hybrid",
      },
      {
        channelName: "demo Channel 3",
        userName: "demo user 3",
        password: await bcrypt.hash("password123", 10),
        about: "Exploring the latest in tech!",
        profilePic:
          "https://img.freepik.com/free-vector/young-man-with-glasses-illustration_1308-174706.jpg?ga=GA1.1.2065219596.1711430494&semt=ais_hybrid",
      },
    ]);
    console.log("👥 Users Created");

    const videos = await Video.insertMany([
      {
        user: users[0]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/7657449/7657449-hd_1920_1080_25fps.mp4",
        thumbnail:
          "https://rocketium.com/academy/wp-content/uploads/2018/04/importance-of-video-thumbnail.png",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },
      {
        user: users[0]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/8244317/uhd_25fps.mp4",
        thumbnail:
          "https://blog.gale.com/wp-content/uploads/2024/07/iStock-1693812103.jpg",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },

      {
        user: users[1]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/7657449/7657449-hd_1920_1080_25fps.mp4",
        thumbnail:
          "https://rocketium.com/academy/wp-content/uploads/2018/04/importance-of-video-thumbnail.png",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },

      {
        user: users[1]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/8244317/uhd_25fps.mp4",
        thumbnail:
          "https://blog.gale.com/wp-content/uploads/2024/07/iStock-1693812103.jpg",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },

      {
        user: users[2]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/7657449/7657449-hd_1920_1080_25fps.mp4",
        thumbnail:
          "https://rocketium.com/academy/wp-content/uploads/2018/04/importance-of-video-thumbnail.png",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },

      {
        user: users[2]._id,
        title: "ReactJS Crash Course",
        description: "Learn React in 1 hour!",
        videoLink:
          "https://videos.pexels.com/video-files/8244317/uhd_25fps.mp4",
        thumbnail:
          "https://blog.gale.com/wp-content/uploads/2024/07/iStock-1693812103.jpg",
        videoType: "Education",
        like: 120,
        dislike: 5,
      },
    ]);
    console.log("🎥 Videos Created");

    // Create Comments
    await Comment.insertMany([
      {
        user: users[1]._id,
        video: videos[0]._id,
        message: "Awesome React tutorial! Thanks a lot!",
      },
      {
        user: users[0]._id,
        video: videos[0]._id,
        message: "Great explanation! Helped me a lot.",
      },
      {
        user: users[1]._id,
        video: videos[1]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[2]._id,
        video: videos[1]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[1]._id,
        video: videos[2]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[2]._id,
        video: videos[2]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[0]._id,
        video: videos[3]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[0]._id,
        video: videos[3]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[1]._id,
        video: videos[4]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[2]._id,
        video: videos[4]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[0]._id,
        video: videos[5]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[1]._id,
        video: videos[5]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[1]._id,
        video: videos[0]._id,
        message: "AI is the future! Super informative video.",
      },
      {
        user: users[1]._id,
        video: videos[0]._id,
        message: "AI is the future! Super informative video.",
      },
    ]);

    console.log("💬 Comments Added");

    console.log("✅ Database Initialization Complete!");
    mongoose.connection.close();
  } catch (error) {
    console.log("Error sedding dataBase:", error);
  }
}

seedDb();
