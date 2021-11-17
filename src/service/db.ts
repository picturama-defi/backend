import mongoose from "mongoose";
import config from "../config";

export const connectToDB = async () => {
  console.log("Connecting to db...");
  await mongoose.connect(config.mongo_url);
  console.log("Connected to db");
};
