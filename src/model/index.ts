const mongoose = require("mongoose");

export const ProjectOwner = mongoose.model("project_owner", {
  publicKey: String,
});
