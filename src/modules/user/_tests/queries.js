export const userCreateQ = `mutation UserCreate($userInput: UserFields!) {
  userCreate(userInput: $userInput) {
    firstName
    lastName
    _id
  }
}`

export const userCreateQInv = `mutation UserCreate($userInput: UserFields!) {
  userCreate(userInput: $userInput) {
    firstName_
    lastName
    _id
  }
}`


export const userGetByIdQ = `query UserGetById($userId: ID!) {
  userGetById(userId: $userId) {
    _id
    firstName
    lastName
  }
}`
