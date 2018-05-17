"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const graphql_tools_1 = require("graphql-tools");
const books = [
    {
        title: "Harry Potter and the Sorcerer's stone",
        author: 'J.K. Rowling'
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton'
    }
];
const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
`;
const resolvers = {
    Query: { books: () => books },
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers
});
const app = express_1.default();
app.use('/graphql', body_parser_1.default.json(), apollo_server_express_1.graphqlExpress({ schema }));
app.use('/graphiql', apollo_server_express_1.graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run quieries!');
});
