const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnect")
const { signToken } = require("../helpers/jwt")
const UserDB = () => {
  return getDatabase().collection("users")
}

const findAllUser = async () => {
  const agg = [
    {
      '$project': {
        'password': 0
      }
    },
    {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followingId',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followerId',
        'as': 'following'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'follower.followerId',
        'foreignField': '_id',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'following.followingId',
        'foreignField': '_id',
        'as': 'following'
      }
    }, {
      '$project': {
        'follower._id': 0,
        'following._id': 0,
        'follower.createdAt': 0,
        'follower.updatedAt': 0,
        'following.createdAt': 0,
        'following.updatedAt': 0,
        'follower.email': 0,
        'follower.name': 0,
        'follower.password': 0,
        'following.email': 0,
        'following.name': 0,
        'following.password': 0
      }
    }
  ]
  const users = await UserDB().aggregate(agg).toArray()
  // console.log(users);
  return users
}

const findUserById = async (id) => {

  const agg = [
    {
      '$match': {
        _id: new ObjectId(id),
      }
    }, {
      '$project': {
        'password': 0,
      }
    },
    {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followingId',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followerId',
        'as': 'following'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'follower.followerId',
        'foreignField': '_id',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'following.followingId',
        'foreignField': '_id',
        'as': 'following'
      }
    }, {
      '$project': {
        'follower.password': 0,
        'following.password': 0
      }
    }
  ];

  const user = await UserDB().aggregate(agg).toArray()

  return user[0]
}

const findUserByQuery = async (query) => {
  const agg = [
    {
      '$match': {
        '$or': [
          {
            'username': {
              '$regex': `(?i)${query}(?-i)`
            }
          }, {
            'name': {
              '$regex': `(?i)${query}(?-i)`
            }
          }
        ]
      }
    }, {
      '$project': {
        'password': 0
      }
    }];

  const user = await UserDB().aggregate(agg).toArray()
  return user
}

const findMyProfile = async (id) => {
  const agg = [
    {
      '$match': {
        _id: new ObjectId(id),
      }
    }, {
      '$project': {
        'password': 0,
      }
    },
    {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followingId',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Follow',
        'localField': '_id',
        'foreignField': 'followerId',
        'as': 'following'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'follower.followerId',
        'foreignField': '_id',
        'as': 'follower'
      }
    }, {
      '$lookup': {
        'from': 'Users',
        'localField': 'following.followingId',
        'foreignField': '_id',
        'as': 'following'
      }
    }, {
      '$project': {
        'follower.password': 0,
        'following.password': 0
      }
    }

  ];
  const user = await UserDB().aggregate(agg).toArray()

  return user[0]
}

const findUserByUsername = async (username) => {
  const user = await UserDB().findOne({ username })
  return user
}

const findUserByEmail = async (email) => {
  
  const user = await UserDB().findOne({ email })
  console.log(user);
  
  return user
}

const registerNewUser = async (pl) => {
  const newUser = await UserDB().insertOne(pl)
  const dataUser = await UserDB().findOne({
    _id: new ObjectId(newUser.insertedId)
  })

  return dataUser
}

const Login = async (pl) => {
  const data = signToken(pl)

  return data
}

module.exports = {
  findAllUser,
  findUserById,
  findUserByQuery,
  findUserByEmail,
  findUserByUsername,
  registerNewUser,
  findMyProfile,
  Login
}