import User from "../Model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//  Cookie options for JWT
const cookieOptions = {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: "Lax",
};

//  User Registration (Sign Up)
export const signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;

    if (!channelName || !userName || !about || !profilePic || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const isExist = await User.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      channelName,
      userName,
      about,
      profilePic,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.error("SignUp Error:", error);
    res.status(500).json({ error: error.message });
  }
};

//  User Login (Sign In)
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //Set cookie and return user data

    res.cookie("token", token, cookieOptions).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        channelName: user.channelName,
        userName: user.userName,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//  User Logout
export const logout = async (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .json({ message: "Logged out successfully" });
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("internal server error");
  }
};
