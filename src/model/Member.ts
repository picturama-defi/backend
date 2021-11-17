import { Schema, model } from "mongoose";

export const MemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  photoB64: {
    type: String,
    requrired: true,
  },
});
