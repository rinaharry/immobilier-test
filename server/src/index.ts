import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectToDatabase from "./mongoose";

import resolvers from "./resolvers";

import { readFileSync } from "fs";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async () => {
  await connectToDatabase();
  const { url } = await startStandaloneServer(server, {
    context: async () => null,
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
};

start();
