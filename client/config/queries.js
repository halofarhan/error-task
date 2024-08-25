import { gql } from "@apollo/client";


export const GET_POST_BY_ID = gql`
  query GetProductById($getPostById: ID) {
    getPostById(id: $getPostById) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      username
      content
    }
    likes {
      username
    }
    author {
      username
    }
  }
  }
`;

export const LOGIN = gql`
  mutation UserLogin($input: ReqLogin!) {
    userLogin(input: $input) {
      username
      access_token
    }
  }
`;

export const GET_POSTS = gql`
query Query {
  getPost {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
    }
    createdAt
    updatedAt
    author {
      _id
      username
    }
    likes {
      username
    }
  }
}
`

export const ADD_LIKES = gql`
mutation Mutation($input: CreateLikes) {
  addLikes(input: $input) {
    _id
    content
    tags
    imgUrl
    authorId
    author {
      _id
      username
      email
      name
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const ADD_COMMENT = gql`
  mutation addComment($input: CreateComments!) {
    addComment(input: $input) {
    comments {
      content
      username
      createdAt
      updatedAt
    }
  }
`;

export const FOLLOW_USER = gql`
mutation Mutation($input: GenerateFollower) {
  addFollowing(input: $input) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}
`
export const GET_USER_DATA = gql`
query Query {
  getUsers {
    _id
    name
    username
    email
    password
    follower {
      _id
      name
      username
      email
      password
    }
    following {
      _id
      name
      username
      email
      password
    }
  }
}
`
export const ADD_POST = gql`
mutation Mutation($input: CreatePostInput) {
  addPost(input: $input) {
    _id
    content
    tags
    imgUrl
    authorId
    author {
      _id
      name
      username
      email
      password
    }
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
`

export const SEARCH_USER = gql`
query Query($query: String!) {
  getUserByQuery(query: $query) {
    _id
    name
    username
    email
    password
    follower {
      _id
      name
      username
      email
      password
    }
    following {
      _id
      name
      username
      email
      password
    }
  }
}
`
