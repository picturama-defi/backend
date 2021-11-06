const mongoose = require("mongoose");

export const connectToDB = async () => {
  console.log("Connecting to db...");
  await mongoose.connect("mongodb://localhost:27017/picturama");
  console.log("Connected to db");
};
