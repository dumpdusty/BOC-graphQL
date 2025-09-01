import { Types } from "mongoose";
import User from "../Model.js";
import { GraphQLError } from "graphql";

const userDeleteById = async (_, { userId }) => {
  if (!userId) {
    throw new GraphQLError("User ID must be provided.", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  if (!Types.ObjectId.isValid(userId)) {
    throw new GraphQLError("Invalid User ID format.", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const objectId = new Types.ObjectId(userId);

  // find the user first so we can return details later
  const existingUser = await User.findById(objectId)
    .select("_id firstName lastName")
    .lean();

  if (!existingUser) {
    throw new GraphQLError("User not found.", {
      extensions: { code: "USER_NOT_FOUND" },
    });
  }

  const { deletedCount } = await User.deleteOne({ _id: objectId });

  if (deletedCount > 0) {
    return {
      success: true,
      message: `${deletedCount} user deleted`,
      deletedUsers: [existingUser],
    };
  }

  throw new GraphQLError("User deletion failed.", {
    extensions: { code: "DELETE_FAILED" },
  });
};

export default userDeleteById;
