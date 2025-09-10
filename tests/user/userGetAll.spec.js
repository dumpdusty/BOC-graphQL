import { expect } from 'chai';
import { userGetAllQueryInvalid } from '../../helpers/user/query.js';
import { userGetAllData } from '../../helpers/user/data.js';
import user from '../../helpers/user/functions.js'

let responseData;
let userId;

describe('USER GET ALL POSITIVE', () => {
    before(async () => {
        await user.createUser()
        responseData = (await user.getAllUsers()).data.userGetAll
        userId = responseData[0]._id
   
    })

    it('verify response contains array of users', async () => {
       expect(responseData).to.be.an('array')
    })

    it('verify users array is not empty', async () => {
       expect(responseData.length).to.be.greaterThan(0)
    })
    
    it('verify each user has an id', async () => {
        for (let i = 0; i < responseData.length; i++) {
            expect(responseData[i]).to.have.property('_id')
            expect(responseData[i]).not.to.be.empty  
        }
    })

    after(async () => {
        await user.deleteUserById(userId)
    })
})

describe('USER GET ALL NEGATIVE', () => {
    describe('user get all - invalid query', () => {
        before(async () => {
            responseData = (await user.getAllUsers(userGetAllQueryInvalid, userGetAllData, 400)).errors[0]
         })

        it('verify error message', async () => {
            expect(responseData.message).contains('Cannot query field "_id_invalid" on type "User".')
        })
    
        it('verify error extension code', async () => {
           expect(responseData.extensions.code).eq('GRAPHQL_VALIDATION_FAILED')
        })
    })
})