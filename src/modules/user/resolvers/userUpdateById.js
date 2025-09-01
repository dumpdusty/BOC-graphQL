import { Types } from "mongoose";
import User from "../Model.js";
import { GraphQLError } from "graphql";

const userUpdateById = async (
  _,
  { userInput: { userId, firstName, lastName } }
) => {
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
  if (firstName !== undefined && !firstName.trim()) {
    throw new GraphQLError("First name cannot be empty.", {
      extensions: { code: "FIRSTNAME_REQUIRED" },
    });
  }
  if (lastName !== undefined && !lastName.trim()) {
    throw new GraphQLError("Last name cannot be empty.", {
      extensions: { code: "LASTNAME_REQUIRED" },
    });
  }

  const objectId = new Types.ObjectId(userId);

  const updatedUser = await User.findByIdAndUpdate(
    objectId,
    { ...(firstName !== undefined && { firstName }), ...(lastName !== undefined && { lastName }) },
    { new: true, runValidators: true }
  ).lean();

  if (!updatedUser) {
    throw new GraphQLError("User not found.", {
      extensions: { code: "USER_NOT_FOUND" },
    });
  }

  return updatedUser;
};

export default userUpdateById;
