require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { mongoConnect } = require("./config/mongoConnect");
const { postTypeDefs, postResolvers } = require("./schemas/post");
const authentication = require("./helpers/auth");
const { followTypeDefs, followResolver } = require("./schemas/follow");


const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolver],
  introspection: true,
});

async function serverListen() {
  try {
    await mongoConnect()

        const { url } = await startStandaloneServer(server, {
            context: async ({ req, res }) => {
                return {
                    authentication: async () => {
                        return await authentication(req)
                    }
                }
            },
            listen: { port: process.env.PORT || 4000 }
        });

        console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.log(error);
  }
}

serverListen();