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


export const userGetAllQuery = 
    `query UserGetAll($amount: Int) {
    userGetAll(amount: $amount) {
        _id
        firstName
        lastName
    }
    }`