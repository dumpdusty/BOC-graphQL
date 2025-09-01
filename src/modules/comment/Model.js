import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow comments without an existing user
    },
    rating: { type: Number },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
