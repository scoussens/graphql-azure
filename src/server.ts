import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import { makeExecutableSchema } from 'graphql-tools';

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

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/graphiql to run quieries!');
});