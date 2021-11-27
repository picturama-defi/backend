import { Schema, model } from "mongoose";
import { MemberSchema } from "./Member";

export const FilmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  script: {
    type: String,
    required: true,
  },
  demoReelLink: {
    type: String,
    required: true,
  },
  targetFund: {
    type: String,
    required: true,
  },
  team: {
    type: [MemberSchema],
    required: true,
  },
  isFunded: {
    type: Boolean,
  },
  ownerPublicAddress: {
    type: String,
    required: true
  }
});

const Film = model("Film", FilmSchema);

export default Film;
