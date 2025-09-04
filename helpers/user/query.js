export const userCreateQuery = 
`mutation UserCreate($userInput: UserCreateInput!) {
    userCreate(userInput: $userInput) {
        _id
        firstName
        lastName
        comments {
        _id
        title
        description
        createdAt
        rating
        }
    }
}`