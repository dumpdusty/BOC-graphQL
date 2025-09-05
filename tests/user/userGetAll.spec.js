import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userGetAllQuery, userGetAllQueryInvalid } from '../../helpers/user/query.js';
import { userGetAllData } from '../../helpers/user/data.js';
import { userCreate } from '../../helpers/user/functions.js';

let responseData;

describe('USER GET ALL POSITIVE', () => {
    const userGetAllRequestData = {
        query: userGetAllQuery,
        variables: userGetAllData
    }

    before(async () => {
        await userCreate()  // Ensure at least one user exists
        const response = await gqlRequest(userGetAllRequestData).expect(200)
        responseData = response.body.data.userGetAll
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
})

describe('USER GET ALL NEGATIVE', () => {
    before(async () => {
        const userGetAllRequestData = {
            query: userGetAllQueryInvalid,
            variables: userGetAllData
        }

        const response = await gqlRequest(userGetAllRequestData).expect(400)
        responseData = response.body.errors[0]
    })

     it('verify error message', async () => {
            expect(responseData.message).contains('Cannot query field "_id_invalid" on type "User".')
        })
    
        it('verify error extension code', async () => {
           expect(responseData.extensions.code).eq('GRAPHQL_VALIDATION_FAILED')
        })
})