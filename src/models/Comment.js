import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
  _id: {
    type: Types.ObjectId
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true },

  createdAt: {
    type: String
  },
  rating: {
    type: Number
  },
  title: {
    type: String,
    trim: true },

  description: { type: String, trim: true },
});

export default model("Comment", commentSchema);
