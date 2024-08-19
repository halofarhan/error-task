const { getDatabase } = require("../config/mongoConnect");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql 
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    register(name: String, username: String, email: String, password: String): User
    login(username: String, password: String): String
  }
`;

const resolvers = {
  Mutation: {
    register: async (parent, args) => {
      const { name, username, email, password } = args
      console.log(args);

      const db = getDatabase();
      const userCollection = db.collection("users");

      const newUser = await userCollection.insertOne({
        name,
        username,
        email,
        password: hashPassword(password)
      })

      const user = await userCollection.findOne({
        _id: newUser.insertedId
      })

      return user
    },

    login: async (parent, args) => {
      const { username, password } = args

      const db = getDatabase()
      const userCollection = db.collection("users");

      const login = await userCollection.findOne({
        username: username
      })

      const isPasswordValid = comparePassword(password, login.password)

      const payload = {
        id: login._id,
        username: login.username
      }

      const access_token = signToken(payload)

      return access_token
    }


  }
}

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};

