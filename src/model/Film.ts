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
    type: Number,
    required: true,
  },
  team: {
    type: [MemberSchema],
    required: true,
  },
  fundingId: {
    type: Number,
  },
});

const Film = model("Film", FilmSchema);

export default Film;
