import mongoose from "mongoose";
import config from "../config";

export const connectToDB = async () => {
  console.log("Connecting to db...");
  await mongoose.connect(config.MONGO_DB_URL);
  console.log("Connected to db");
};
