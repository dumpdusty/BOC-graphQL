import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const MONGODB = "mongodb://localhost:27017/the-book-of-comments";
const PORT = 5000;

async function start() {
  try {
    await mongoose.connect(MONGODB);
    console.log("MongoDB connected successfully");

    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, { listen: { port: PORT } });

    console.log(`🚀 Server ready at ${url}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
