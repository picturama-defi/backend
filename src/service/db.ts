import mongoose from "mongoose";
require("dotenv").config();

const remote_url = `mongodb+srv://Jithin:${process.env.MONGO_PASSWORD}@cluster0.p5d7p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const local_url = `mongodb://localhost:27017/picturama`

export const connectToDB = async () => {
  console.log("Connecting to db...");
  await mongoose.connect(remote_url);
  console.log("Connected to db");
};
