import User from "../Model.js";

const userGetAll = async (_, { amount }) => {
  return User.find()
    .sort({ createdAt: -1 })
    .limit(amount || 0)
    .lean();
};

export default userGetAll;

