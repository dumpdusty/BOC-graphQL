import { Types } from "mongoose";
import Comment from "../Model.js";
import User from "../../user/Model.js";
import { GraphQLError } from "graphql";

const commentCreate = async (_, { commentInput }) => {
  const {
    userId: userIdInput,
    newUser,
    rating,
    title,
    description,
  } = commentInput ?? {};

  let userId = null;

  if (userIdInput != null) {
    if (!Types.ObjectId.isValid(userIdInput)) {
      throw new GraphQLError("Invalid User ID format.", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }
    userId = new Types.ObjectId(userIdInput);
  }

  if (!userId && newUser) {
    const firstName = (newUser.firstName ?? "").trim();
    const lastName = (newUser.lastName ?? "").trim();

    if (!firstName) {
      throw new GraphQLError("Required firstname hasn't been provided", {
        extensions: { code: "FIRSTNAME_REQUIRED" },
      });
    }
    if (!lastName) {
      throw new GraphQLError("Required lastname hasn't been provided", {
        extensions: { code: "LASTNAME_REQUIRED" },
      });
    }

    const createdUser = await User.create({ firstName, lastName });
    userId = createdUser._id;
  }

  if (rating == null || rating < 1 || rating > 4) {
    throw new GraphQLError("Rating must be between 1 and 4", {
      extensions: { code: "INVALID_RATING" },
    });
  }

  const created = await Comment.create({
    ...(userId && { user: userId }),
    rating,
    title,
    description,
  });

  return Comment.findById(created._id).populate("user").lean();
};

export default commentCreate;
