const { ObjectId } = require("mongodb")
const { getDatabase } = require("../config/mongoConnect")

const PostsTable = () => {
  return getDatabase().collection("posts")
}

const findAllPosts = async () => {
  const agg = [
    {
      '$lookup': {
        'from': 'users',
        'localField': 'authorId',
        'foreignField': '_id',
        'as': 'author'
      }
    }, {
      '$unwind': {
        'path': '$author',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'author.password': 0,
        'author.email': 0,
        'author._id': 0,
        'comments.createdAt': 0,
        'comments.updatedAt': 0,
        'likes.createdAt': 0,
        'likes.updatedAt': 0
      }
    }, {
      '$sort': {
        'createdAt': -1
      }
    }
  ]
  const posts = await PostsTable().aggregate(agg).toArray()
  
  
  return posts
}

const findPostById = async (id) => {
  const agg = [
    {
      '$lookup': {
        'from': 'users',
        'localField': 'authorId',
        'foreignField': '_id',
        'as': 'author'
      }
    }, {
      '$unwind': {
        'path': '$author',
        'preserveNullAndEmptyArrays': true
      }
    }, {
      '$project': {
        'author.password': 0,
        'author.email': 0,
        'author._id': 0,
        'comments.createdAt': 0,
        'comments.updatedAt': 0,
        'likes.createdAt': 0,
        'likes.updatedAt': 0
      }
    }, {
      '$match': {
        '_id': new ObjectId(id)
      }
    }
  ]
  const post = await PostsTable().aggregate(agg).toArray();

  return post[0];
}

const createPost = async (data) => {
  const newPost = await PostsTable().insertOne(data)
  const dataPost = await PostsTable().findOne({
    _id: new ObjectId(newPost.insertedId)
  })

  return dataPost
}

const createComment = async (id, data) => {
  const updatePostComment = await PostsTable().updateOne(
    { _id: new ObjectId(id) },
    { $push: { comments: data } }
  )

  const postData = await findPostById(id)

  return postData
}

const createLikes = async (id, data) => {
  const updatePost = await PostsTable().updateOne(
    { _id: new ObjectId(id) },
    { $push: { likes: data } }
  )

  const postData = await findPostById(id)

  return postData
}

module.exports = { findAllPosts, findPostById, createPost, createComment, createLikes }