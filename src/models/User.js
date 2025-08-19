import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId
    },
    firstName: {
      type: String,
      trim: true },

    lastName: {
      type: String,
      trim: true },

    comments: [{
      type: Types.ObjectId,
      ref: "Comment" }],
  },
  { timestamps: true }
);

export default model("User", userSchema);
