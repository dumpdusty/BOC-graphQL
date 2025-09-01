import { Types } from "mongoose";
import Comment from "../Model.js";
import { GraphQLError } from "graphql";

const commentGetById = async (_, { commentId }) => {
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

  const comment = await Comment.findById(new Types.ObjectId(commentId)).lean();
  if (!comment) {
    throw new GraphQLError("Comment not found.", {
      extensions: { code: "COMMENT_NOT_FOUND" },
    });
  }
  return comment;
};

export default commentGetById;
