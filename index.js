const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const DogFood  = require('./DogFood');

const port = process.env.PORT || 3001;

const typeDefs = gql`
  type Name {
    name: String,
  }
  type Query {
    getName: Name
  }
`;

const resolvers = {
  Query: {
    getName: async (_, __, { dataSources }) => dataSources.DogFood.getName(),
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    DogFood: new DogFood()
  })
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);