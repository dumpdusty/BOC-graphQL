import { ObjectId } from "mongodb";
import  User  from "../models/User.js";
import  Comment  from "../models/Comment.js";
import  generateId  from "../utils/generateId.js";

export default {
  Query: {
    async usersGetAll(_, { amount }) {
      return User.find().sort({ createdAt: -1 }).limit(amount);
    },

    async userGetById(_, { userId }) {
      return User.findById(new ObjectId(userId));
    },

    async commentGetAll(_, { amount }) {
      return Comment.find().sort({ createdAt: -1 }).limit(amount);
    },

    async commentGetById(_, { commentId }) {
      return Comment.findById(new ObjectId(commentId));
    },
  },

  Mutation: {
    async userCreate(_, { userInput: { firstName, lastName } }) {
      const userId = generateId();
      const createdUser = new User({
        _id: userId,
        firstName,
        lastName,
      });

      const res = await createdUser.save();
      return { id: res.id, ...res._doc };
    },

    async userUpdateById(_, { userInput: { userId, firstName, lastName } }) {
      const objectId = new ObjectId(userId);
      const { modifiedCount } = await User.updateOne(
        { _id: objectId },
        { firstName, lastName }
      );

      if (modifiedCount > 0) {
        return User.findById(objectId);
      } else {
        console.log("User update failed or no changes were made");
        return null;
      }
    },

    async userDeleteById(_, { userId }) {
      const objectId = new ObjectId(userId);
      const { deletedCount } = await User.deleteOne({ _id: objectId });
      return deletedCount > 0;
    },

    async commentCreate(
      _,
      { commentInput: { user: { userId }, rating, title, description } }
    ) {
      const objectId = new ObjectId(userId);
      const commentId = generateId();

      const createdComment = new Comment({
        _id: commentId,
        user: objectId,
        createdAt: new Date().toISOString(),
        rating,
        title,
        description,
      });

      const res = await createdComment.save();
      return { id: res.id, ...res._doc };
    },

    async commentUpdateById(
      _,
      { commentId, commentInput: { rating, title, description } }
    ) {
      const objectId = new ObjectId(commentId);
      const { modifiedCount } = await Comment.updateOne(
        { _id: objectId },
        { rating, title, description }
      );

      if (modifiedCount > 0) {
        return Comment.findById(objectId);
      }
      return null;
    },

    async commentDeleteById(_, { commentId }) {
      const objectId = new ObjectId(commentId);
      const { deletedCount } = await Comment.deleteOne({ _id: objectId });
      return deletedCount > 0;
    },
  },
};
