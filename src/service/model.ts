const mongoose = require("mongoose");

export const ProjectOwner = mongoose.model("ProjectOwner", {
  publicKey: String,
});
