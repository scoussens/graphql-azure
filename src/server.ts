import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';
import { BOOKS } from './data/books';

const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
`;

const resolvers = {
    Query: { books: () => BOOKS },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Go to http://localhost:%d/graphiql to run quieries!", port);
});