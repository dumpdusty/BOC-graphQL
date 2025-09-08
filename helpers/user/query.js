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

 export const userCreateQueryInvalid = 
    `mutation UserCreate($userInput: UserCreateInput!) {
        userCreate(userInput: $userInput) {
            _id
            firstName_1
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

export const userGetAllQueryInvalid = 
    `query UserGetAll($amount: Int) {
    userGetAll(amount: $amount) {
        _id_invalid
        firstName
        lastName
    }
    }`