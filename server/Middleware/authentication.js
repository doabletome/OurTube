import jwt from "jsonwebtoken";
import User from "../Model/user.js";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    //  Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    //  Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //  Attach user to request object (excluding password)
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "User not found. Please login." });
    }

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default auth;
