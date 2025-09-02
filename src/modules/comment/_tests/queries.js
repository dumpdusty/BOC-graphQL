export const commentCreateQ = `mutation CommentCreate($commentInput: CommentFields!) {
  commentCreate(commentInput: $commentInput) {
    _id
    createdAt
    description
    rating
    title
    user {
      firstName
      lastName
      _id
    }
  }
}
`
