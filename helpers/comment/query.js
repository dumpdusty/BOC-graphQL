export const commentCreateQuery = 
`mutation CommentCreate($commentInput: CommentCreateInput!) {
  commentCreate(commentInput: $commentInput) {
    _id
    createdAt
    description
    rating
    title
    user {
      _id
      firstName
      lastName
    }
  }
}
`

export const commentCreateQueryInvalid = 
`mutation CommentCreate($commentInput: CommentCreateInput!) {
  commentCreate(commentInput: $commentInput) {
    _id
    createdAt
    description
    rating
    title
    user {
      _id
      firstName
      lastName
    }
  }
}
`
