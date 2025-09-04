import Chance from 'chance'
const chance = new Chance()

export const userCreateData = {
    "userInput": {
    "firstName": chance.first(),
    "lastName": chance.last()
    }
}

export const userCreateDataInvalid = {
    "userInput": {
    "firstName_invalid": chance.first(),
    "lastName": chance.last()
    }
}   


export const userGetAllData = {
    "amount": chance.integer({min: 10, max: 100})
}