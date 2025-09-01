import Comment from "../Model.js";

const commentGetAll = async (_, { amount }) => {
  return Comment.find().sort({ createdAt: -1 }).limit(amount || 0).lean();
};

export default commentGetAll;
