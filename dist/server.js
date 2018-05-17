"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;
const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
    },
};
const server = new graphql_yoga_1.GraphQLServer({ typeDefs, resolvers });
let port = process.env.port || 4300;
server.start({ port }, () => console.log('Server is running on localhost:4000'));
