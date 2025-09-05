import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData, userCreateDataInvalid } from '../../helpers/user/data.js';

let responseData;

describe.skip('USER CREATE POSITIVE', () => {
    const userCreateRequestData = {
            query: userCreateQuery,
            variables: userCreateData
    }
    
    before(async() => {
        const response = await gqlRequest(userCreateRequestData).expect(200)
        responseData = response.body.data.userCreate
        console.log(responseData)
    })

    it('verify created user has an id', async () => {
        expect(responseData._id).to.be.a('string')
    })

    it('verify created user first name', async () => {
        expect(responseData.firstName)
            .eq(userCreateRequestData.variables.userInput.firstName)
    })

    it('verify created user last name', async () => {          
        expect(responseData.lastName)
            .eq(userCreateRequestData.variables.userInput.lastName)
    })
})


describe('USER CREATE NEGATIVE', () => {
    before(async () => {
          const userCreateRequestData = {
                query: userCreateQuery,
                variables: userCreateDataInvalid
        }
        const response = await gqlRequest(userCreateRequestData).expect(400)
        responseData = response.body.errors[0]
        console.log(responseData)
        console.log(responseData.extensions)
        
    })

    it('verify error message', async () => {
        expect(responseData.message).contains('Variable "$userInput" got invalid value')
    })

    it('verify error extension code', async () => {
        expect(responseData.extensions.code).eq('BAD_USER_INPUT')
    })
})
