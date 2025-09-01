import commentGetAll from "./commentGetAll.js";
import commentGetById from "./commentGetById.js";
import commentCreate from "./commentCreate.js";
import commentUpdateById from "./commentUpdateById.js";
import commentDeleteById from "./commentDeleteById.js";

const commentResolvers = {
  Query: {
    commentGetAll,
    commentGetById,
  },
  Mutation: {
    commentCreate,
    commentUpdateById,
    commentDeleteById,
  },
};

export default commentResolvers;
