const { GraphQLError } = require("graphql")
const { verifyToken } = require("./jwt")
const { findUserById } = require("../models/user")


const authentication = async (req) => {
    const authorization = req.headers.authorization
    // console.log(authorization, "<<<<");
    if (!authorization) {
        throw new GraphQLError("Invalid Token", {
            extensions: {
                code: 'Unauthorized',
                http: { status: 401 },
            },
        })
    }

    const token = authorization.split(" ")[1]
    // console.log(token);

    if (!token) {
        throw new GraphQLError("Invalid Token", {
            extensions: {
                code: 'Unauthorized',
                http: { status: 401 },
            },
        })
    }

    const decodeToken = verifyToken(token)

    const user = await findUserById(decodeToken.id)
    console.log(user);

    if(!user) {
        throw new GraphQLError("Invalid User", {
            extensions: {
                code: 'Unauthorized',
                http: { status: 401 },
            },
        })
    }


    return {
        userId: user._id,
        username: user.username
    }

}

module.exports = authentication