import { expect } from 'chai';
import { userDeleteByIdQueryInvalid } from '../../helpers/user/query.js';
import user from '../../helpers/user/functions.js'

let responseData;
let userId;

describe('USER DELETE POSITIVE', () => {
    before(async () => {
        userId = (await user.createUser()).data.userCreate._id

         responseData = (await user.deleteUserById(userId)).data.userDeleteById
    })

    it('verify message', async () => {
       expect(responseData.message).eq('1 user deleted')
    })

    it('verify deleted user id', async () => {
        expect(responseData.deletedUsers[0]._id).eq(userId)
    })
})

describe('USER DELETE NEGATIVE', () => {
    describe('user delete - invalid query', () => {
        before(async () => {
            responseData = (await user.deleteUserById(userId, userDeleteByIdQueryInvalid, 400)).errors[0]
        })

        it('verify error message', async () => {
            expect(responseData.message).eq('Cannot query field "deletedUser" on type "DeleteUserPayload". Did you mean "deletedUsers"?')
        })

        it('verify error extension code', async () => {
            expect(responseData.extensions.code).eq('GRAPHQL_VALIDATION_FAILED')
        })
    })

    describe('user delete - invalid input', () => {
        it('no id provided', async () => {
            responseData = (await user.deleteUserById('')).errors[0]
            expect(responseData.message).eq('User ID must be provided.')
            expect(responseData.extensions.code).eq('BAD_USER_INPUT')
        })

        it('invalid id format provided', async () => {
            responseData = (await user.deleteUserById('invalid_id_format')).errors[0]
            expect(responseData.message).eq('Invalid User ID format.')
            expect(responseData.extensions.code).eq('BAD_USER_INPUT')
        })

        it('id does not exist', async () => {
            const userId = (await user.createUser()).data.userCreate._id
            await user.deleteUserById(userId)
            
            responseData = (await user.deleteUserById(userId)).errors[0]

            expect(responseData.message).eq('User not found.')
            expect(responseData.extensions.code).eq('USER_NOT_FOUND')
        })
    })
})