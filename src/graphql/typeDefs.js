import { gql } from "graphql-tag";

export default gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    comments: [Comment!]
  }

  type Comment {
    _id: ID!
    user: User
    createdAt: String
    rating: Int
    title: String
    description: String
  }

  input UserFields {
    userId: ID
    firstName: String
    lastName: String
  }

  input CommentFields {
    commentId: ID
    user: UserFields
    rating: Int
    title: String
    description: String
  }

  type Query {
    usersGetAll(amount: Int): [User!]!
    userGetById(userId: ID!): User
    commentGetAll(amount: Int): [Comment!]!
    commentGetById(commentId: ID!): Comment
  }

  type Mutation {
    userCreate(userInput: UserFields!): User!
    userUpdateById(userInput: UserFields!): User
    userDeleteById(userId: ID!): Int
    commentCreate(commentInput: CommentFields!): Comment!
    commentUpdateById(commentId: ID!, commentInput: CommentFields!): Int
    commentDeleteById(commentId: ID!): Int
  }
`;
