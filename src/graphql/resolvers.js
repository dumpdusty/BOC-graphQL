import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "../modules/user/resolvers/index.js";
import commentResolvers from "../modules/comment/resolvers/index.js";

const resolvers = mergeResolvers([userResolvers, commentResolvers]);

export default resolvers;

