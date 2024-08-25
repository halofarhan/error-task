const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { findAllUser, findUserById, registerNewUser, findUserByEmail, findUserByQuery, findUserByUsername, findMyProfile } = require("../models/user");
const { GraphQLError } = require("graphql");

const typeDefs = `#graphql 
 type User {
      _id: ID
      username: String
      email: String
      password: String
      follower: [User]
      following: [User]
    }

  input CreateUserInput {
      username: String!
      email: String!
      password: String!
  }

  input ReqLogin {
      email: String!
      password: String!
  }

  type ResponseLogin {
        username: String
        access_token: String
  }

  type Query {
    getUsers: [User]
    getUserById(_id: ID): User
    getUserByQuery(query: String!): [User]
    getMyProfile: User
  }

  type Mutation {
    registerUser(input: CreateUserInput): User
    userLogin(input: ReqLogin): ResponseLogin
  }
`;

const resolvers = {
  Query: {
    getUsers: async (_parent, _args, contextValue) => {
      const users = await findAllUser()

      return users
    },

    getUserById: async (_parent, args) => {
      const { _id } = args
      console.log(args);
      const user = await findUserById(_id)

      return user
    },

    getUserByQuery: async (_parent, args) => {
      const { query } = args
      const user = await findUserByQuery(query)
      return user
    },

    getMyProfile: async (_parent, _args, contextValue) => {
      const userLogin = await contextValue.authentication()
      const findProfile = await findMyProfile(userLogin.userId)
      console.log(userLogin);
      return findProfile
    }

  },

  Mutation: {
    registerUser: async (_parent, args) => {
      const { username, email, password } = args.input

      const checkUsername = await findUserByUsername(username)
      if (checkUsername) {
        throw new GraphQLError("Username already Exists", {
          extensions: {
            code: 'Error Unique',
            http: { status: 400 },
          },
        });
      }

      const checkEmail = await findUserByEmail(email)

      if (checkEmail) {
        throw new GraphQLError("Email already Exists", {
          extensions: {
            code: 'Error Unique',
            http: { status: 400 },
          },
        });
      }

      if (password.length < 5) {
        throw new GraphQLError("Password must contain at least 5 characters", {
          extensions: {
            code: 'Invalid Password',
            http: { status: 400 },
          },
        });
      }

      if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        throw new GraphQLError("Invalid Email Format", {
          extensions: {
            code: 'Invalid Email',
            http: { status: 400 },
          },
        })
      }

      const dataUser = await registerNewUser({
        username,
        email,
        password: hashPassword(password)
      })

      return dataUser
    },

    userLogin: async (_parent, args) => {
      const { email, password } = args.input

      const isEmailValid = await findUserByEmail(email)
      if (!isEmailValid) {

        throw new GraphQLError("Invalid Email or Password", {
          extensions: {
            code: 'Unauthorized',
            http: { status: 401 },
          },
        });
      }

      console.log("email validdd");


      const isPassValid = comparePassword(password, isEmailValid.password)
      if (!isPassValid) {

        throw new GraphQLError("Invalid Email or Password", {
          extensions: {
            code: 'Unauthorized',
            http: { status: 401 },
          },
        });
      }

      const payload = {
        id: isEmailValid._id,
        username: isEmailValid.username,
        email: isEmailValid.email
      }
      const access_token = signToken(payload)

      return { username: isEmailValid.username, access_token }
    }
  }
}

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};

