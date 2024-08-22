const { findAllPosts, findPostById, createPost, createComment, createLikes } = require("../models/post");


const typeDefs = `#graphql 
  type Post {
    _id: ID
    content: String
    tags: [String]
    imgUrl: String
    authorId: ID
    comments: [Comment]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    author: User
  }

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Likes{
    username: String
    createdAt: String
    updatedAt: String
  }

  input CreatePostInput {
        content: String!
        tags: [String]
        imgUrl: String

    }

  input CreateComments {
        postId: ID
        content: String!
    }

    input CreateLikes {
        postId: ID
    }

  type Query {
    getPost:[Post]
    getPostById(id: ID): Post
  }

  type Mutation {
    addPost(input: CreatePostInput): Post
    addComment(input: CreateComments): Post
    addLikes(input: CreateLikes): Post
  }
`;

const resolvers = {
    Query: {
        getPost: async () => {
            const posts = await findAllPosts()

            return posts
        },

        getPostById: async (_parent, args) => {
            const { id } = args
            const post = await findPostById(id)

            return post
        }
    },
    Mutation: {
        addPost: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()
            const { content, tags, imgUrl } = args.input
            const postData = await createPost({
                content,
                tags,
                imgUrl,
                authorId: userLogin.userId,
                comments: [],
                likes: [],
                createdAt: new Date(),
                updatedAt: new Date()
            })

            return postData
        },
        addLikes: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()
            const { postId } = args.input
            const likes = await createLikes(postId, {
                username: userLogin.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            )
            return likes
        },
        addComment: async (_parent, args, contextValue) => {
            const userLogin = await contextValue.authentication()

            const { postId, content } = args.input

            const comments = await createComment(postId, {
                content,
                username: userLogin.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            )


            return comments

        },
    }
}

module.exports = {
    postTypeDefs: typeDefs,
    postResolvers: resolvers,
};