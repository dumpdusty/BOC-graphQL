import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData } from '../../helpers/user/data.js';



describe('USER CREATE POSITIVE', () => {
    let responseData;
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

