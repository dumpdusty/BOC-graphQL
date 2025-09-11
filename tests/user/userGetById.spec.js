import gqlRequest from '../../helpers/gqlRequest.js';
import { expect } from 'chai';
import { userGetByIdQueryInvalid} from '../../helpers/user/query.js';
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

describe('USER GET BY ID NEGATIVE', () => {
    describe('user get by id - invalid query', () => {
        before(async () => {
            createdUser = (await user.createUser()).data.userCreate._id
            responseData = (await user.getUserById(createdUser, userGetByIdQueryInvalid)).errors[0]
        })
        
        it('verify error message', async () => {
            expect(responseData.message).contains('Cannot query field')
        })

        it('verify error code', async () => {
            expect(responseData.extensions.code).eq('GRAPHQL_VALIDATION_FAILED')
        })
    })

    describe.only('user get by id - invalid input data', () => {
        it('verify if user id provided', async () => {
            responseData = (await user.getUserById('')).errors[0]
            expect(responseData.message).eq('User ID must be provided.')
            expect(responseData.extensions.code).eq('BAD_USER_INPUT')
        })

        it('verify if valid user id format', async () => {
            responseData = (await user.getUserById('12345asdfgh')).errors[0]
            expect(responseData.message).eq('Invalid User ID format.')
            expect(responseData.extensions.code).eq('BAD_USER_INPUT')
        })

        it('verify if user id does not exist', async () => {
            createdUser = (await user.createUser()).data.userCreate._id
            await user.deleteUserById(createdUser)
            responseData = (await user.getUserById(createdUser)).errors[0]
            expect(responseData.message).eq('User not found.')
            expect(responseData.extensions.code).eq('USER_NOT_FOUND')
        })
    })
})