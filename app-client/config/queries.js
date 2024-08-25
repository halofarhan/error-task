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


