import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { typeDefs } from "./gql/schema.ts";
import montoose from "mongoose";

const MONGO_URL: string | undefined = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("MONGO_URL not found in env");
  Deno.exit(1);
}

console.log("MONGO_URL:", MONGO_URL);

// Connect to MongoDB
await montoose.connect(MONGO_URL);

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
