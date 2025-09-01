import User from "../Model.js";
import { GraphQLError } from "graphql";

const userCreate = async (_, { userInput }) => {
  const firstName = (userInput?.firstName ?? "").trim();
  const lastName = (userInput?.lastName ?? "").trim();

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

  const created = await User.create({ firstName, lastName });

  // return freshly created user directly
  return User.findById(created._id).lean();
};

export default userCreate;
