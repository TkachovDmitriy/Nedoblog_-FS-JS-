const { buildSchema } = require('graphql');


module.exports = buildSchema(`

type Post {
  _id: ID!
  title: String!
  imgURL:String
  description: String
  date: String!
  author: User!
  comments: [Comment]
}

type Comment {
  _id: ID!
  description: String!
  date: String!
  author: User!
  postId: Post
}

type User {
  _id: ID!
  email: String!  
  name: String!
  createdPosts: [Post!]
  createdComments: [Comment!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  name: String!
  password: String!
}

input CommentInput {
  description: String!
  postId: ID! 
}

input PostInput {
  title: String!
  imgURL: String
  description: String
} 

type RootQuery {
    login(email: String!, password: String!): AuthData!
    posts: [Post!]!
    comments: [Comment!]!
    user : User!
}

type RootMutation {
    createPost(postInput: PostInput): Post
    createComment(commentInput: CommentInput): Comment
    createUser(userInput: UserInput): User
    
    changedPost(postId: ID!, postInput: PostInput): Post!
    changedComment(commentId: ID!): Comment

    deletePost(postId: ID!): [Post]
    deleteComment(commentId: ID!): [Comment]

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);