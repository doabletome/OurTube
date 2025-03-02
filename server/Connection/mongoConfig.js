import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to Db is Successfull");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}
