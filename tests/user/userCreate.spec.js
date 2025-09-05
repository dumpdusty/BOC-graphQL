import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData, userCreateDataInvalid } from '../../helpers/user/data.js';
import { userCreate } from '../../helpers/user/functions.js';

let responseData;

describe('USER CREATE POSITIVE', () => {
    before(async() => {
        responseData = (await userCreate()).data.userCreate
        console.log(responseData)
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
})


describe('USER CREATE NEGATIVE', () => {
    before(async () => {
          const userCreateRequestData = {
                query: userCreateQuery,
                variables: userCreateDataInvalid
        }
        responseData = (await userCreate(userCreateRequestData, 400)).errors[0]   
    })

    it('verify error message', async () => {
        expect(responseData.message).contains('Variable "$userInput" got invalid value')
    })

    it('verify error extension code', async () => {
        expect(responseData.extensions.code).eq('BAD_USER_INPUT')
    })
})
