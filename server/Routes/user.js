import express from "express";
import { signIn, signUp, logout, getUser } from "../Controller/user.js";

const router = express.Router();

// User Registration (Sign Up)
router.post("/signUp", signUp);

//User Login
router.post("/login", signIn);

// User Logout
router.post("/logout", logout);

//get user by id
router.get("/getUser/:id", getUser);

export default router;
