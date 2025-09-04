import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userCreateQuery, userGetAllQuery } from '../../helpers/user/query.js';
import { userCreateData, userGetAllData } from '../../helpers/user/data.js';

let responseData;

describe('USER GET ALL POSITIVE', () => {
    const userCreateRequestData = {
        query: userCreateQuery,
        variables: userCreateData
    }

    const userGetAllRequestData = {
        query: userGetAllQuery,
        variables: userGetAllData
    }

    before(async () => {
        await gqlRequest(userCreateRequestData).expect(200)
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
        }
    })
    
})