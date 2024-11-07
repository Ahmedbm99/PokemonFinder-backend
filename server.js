import { ApolloServer } from 'apollo-server';  
import fetch from 'node-fetch';  
import typeDefs from './schema.js';  
import resolvers from './resolvers.js'; 


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    fetch,
  }),
});


server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
