require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { mongoConnect } = require("./config/mongoConnect");

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  introspection: true, 
});

async function serverListen() {
    try {
      await mongoConnect();
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
  
      console.log(`🚀  Server ready at: ${url}`);
    } catch (error) {
      console.log(error);
    }
  }

serverListen();