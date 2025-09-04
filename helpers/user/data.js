import Chance from 'chance'
const chance = new Chance()

export const userCreateData = {
    "userInput": {
    "firstName": chance.first(),
    "lastName": chance.last()
    }
}   