import { GraphQLServer } from 'graphql-yoga';

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
let port = process.env.port || 4300;
server.start({port}, () => console.log("Server is running on localhost:%d", port))