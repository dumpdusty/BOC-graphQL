import { expect } from 'chai';
import { userCreateQuery, userCreateQueryInvalid } from '../../helpers/user/query.js';
import { userCreateData, userCreateDataInvalid } from '../../helpers/user/data.js';
import user from '../../helpers/user/functions.js'

let responseData;
let userId;

describe('USER CREATE POSITIVE', () => {
    before(async() => {
        responseData = (await user.createUser()).data.userCreate
        userId = responseData._id
    })

    it('verify created user has an id', async () => {
        expect(responseData._id).to.be.a('string')
    })

    it('verify created user first name', async () => {
        expect(responseData.firstName)
            .eq(userCreateData.userInput.firstName)
    })

    it('verify created user last name', async () => {          
        expect(responseData.lastName)
            .eq(userCreateData.userInput.lastName)
    })

    after(async () => {
        await user.deleteUserById(userId)
    })
})


describe('USER CREATE NEGATIVE', () => {
    describe('user create - invalid query',() => {
         before(async () => {
            responseData = (await user.createUser(userCreateQueryInvalid, userCreateData, 400)).errors[0]   
         })
        
         it('verify error message', async () => {
             expect(responseData.message).contains('Cannot query field')
         })

        it('verify error extension code', async () => {
            expect(responseData.extensions.code).eq('GRAPHQL_VALIDATION_FAILED')
        })
    })

    // TODO add more tests based on resolver

    describe('user create - invalid input schema', () => {
        before(async () => {
            responseData = (await user.createUser(userCreateQuery, userCreateDataInvalid, 400)).errors[0]   
        })

        it('verify error message', async () => {
            expect(responseData.message).contains('Variable "$userInput" got invalid value')
        })

        it('verify error extension code', async () => {
            expect(responseData.extensions.code).eq('BAD_USER_INPUT')
        })
    })

    describe('user create - invalid input data', () => {
        it('verify firstName data required', async () => {
            const userCreateRandomData = await user.buildUserCreateData('', 'Sparrow')
            responseData = (
                await user.createUser(userCreateQuery, userCreateRandomData)
            ).errors[0]
            
            expect(responseData.message).eq('Required firstname hasn\'t been provided')
            expect(responseData.extensions.code).eq('FIRSTNAME_REQUIRED')
        })

        it('verify lastName data required', async () => {
            const userCreateRandomData = await user.buildUserCreateData('Jack', '')
            responseData = (
                await user.createUser(userCreateQuery, userCreateRandomData)
            ).errors[0]
            
            expect(responseData.message).eq('Required lastname hasn\'t been provided')
            expect(responseData.extensions.code).eq('LASTNAME_REQUIRED')
        })

        
    })
})
