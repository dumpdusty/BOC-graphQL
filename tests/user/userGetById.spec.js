import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userGetByIdQuery, userGetAllQueryInvalid } from '../../helpers/user/query.js';
import { userGetAllData } from '../../helpers/user/data.js';
import user from '../../helpers/user/functions.js'

let responseData;
let createdUser;

describe('USER GET BY ID POSITIVE', () => {
    before(async () => {
        createdUser = (await user.createUser()).data.userCreate

        responseData = (await user.getUserById(createdUser._id)).data.userGetById
        console.log(responseData);    
    })

    it('verify user id', async () => {
        expect(responseData._id).eq(createdUser._id)
    })

    it('verify user first name', async () => {
        expect(responseData.firstName).eq(createdUser.firstName)
    })

    it('verify user last name', async () => {
        expect(responseData.lastName).eq(createdUser.lastName)
    })

    

    after(async () => {
        await user.deleteUserById(createdUser._id)
    })
})