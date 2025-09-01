import userCreate from "./userCreate.js";
import userGetAll from "./userGetAll.js";
import userGetById from "./userGetById.js";
import userUpdateById from "./userUpdateById.js";
import userDeleteById from "./userDeleteById.js";

const resolvers = {
  Query: {
    userGetAll,
    userGetById,
  },
  Mutation: {
    userCreate,
    userUpdateById,
    userDeleteById,
  },
};

export default resolvers;
