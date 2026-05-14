import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

const MONGODB_URI = "mongodb+srv://fatimatarek2003_db_user:fatma123@cluster0.obuamlj.mongodb.net/?appName=Cluster0";

await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB");

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running on: ${url}`);