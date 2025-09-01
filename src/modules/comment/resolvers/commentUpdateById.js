import { Types } from "mongoose";
import Comment from "../Model.js";
import { GraphQLError } from "graphql";

const commentUpdateById = async (
  _,
  { commentId, commentInput: { rating, title, description, user } }
) => {
  if (!commentId) {
    throw new GraphQLError("Comment ID must be provided.", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  if (!Types.ObjectId.isValid(commentId)) {
    throw new GraphQLError("Invalid Comment ID format.", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const update = {};
  if (rating !== undefined) update.rating = rating;
  if (title !== undefined) update.title = title;
  if (description !== undefined) update.description = description;
  if (user?.userId !== undefined) {
    if (user.userId === null) {
      update.user = undefined;
    } else {
      if (!Types.ObjectId.isValid(user.userId)) {
        throw new GraphQLError("Invalid User ID format.", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      update.user = new Types.ObjectId(user.userId);
    }
  }

  const updated = await Comment.findByIdAndUpdate(
    new Types.ObjectId(commentId),
    update,
    { new: true, runValidators: true }
  ).lean();

  if (!updated) {
    throw new GraphQLError("Comment not found.", {
      extensions: { code: "COMMENT_NOT_FOUND" },
    });
  }

  return updated;
};

export default commentUpdateById;
