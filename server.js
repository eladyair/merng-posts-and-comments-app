const { ApolloServer, PubSub } = require('apollo-server');

// GraphQL typeDefs
const typeDefs = require('./graphql/typeDefs');

// GraphQL resolvers
const resolvers = require('./graphql/resolvers');

const connectToDB = require('./database/db');

// If the server is running locally (in develop)
if (process.env.NODE_ENV !== 'production') {
    require('custom-env').env('development');
}

// Connecting to the mongo db
connectToDB();

const pubsub = new PubSub();

// Setting up the Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

const PORT = process.env.port || 5000;

// Running the server
server.listen({ port: PORT }).then(res => {
    console.log(`Server running at ${res.url}`);
});
