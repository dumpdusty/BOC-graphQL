import { Types } from "mongoose";
import Comment from "../Model.js";
import { GraphQLError } from "graphql";

const commentDeleteById = async (_, { commentId }) => {
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

  const { deletedCount } = await Comment.deleteOne({
    _id: new Types.ObjectId(commentId),
  });

  if (deletedCount > 0) return true;

  throw new GraphQLError("Comment not found.", {
    extensions: { code: "COMMENT_NOT_FOUND" },
  });
};

export default commentDeleteById;
