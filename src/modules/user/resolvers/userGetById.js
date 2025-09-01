import { Types } from "mongoose";
import User from "../Model.js";
import { GraphQLError } from "graphql";

const userGetById = async (_, { userId }) => {
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

  const user = await User.findById(new Types.ObjectId(userId)).lean();
  if (!user) {
    throw new GraphQLError("User not found.", {
      extensions: { code: "USER_NOT_FOUND" },
    });
  }

  return user;
};

export default userGetById;
