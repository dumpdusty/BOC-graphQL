import { expect } from 'chai';
import { userDeleteByIdQuery } from '../../helpers/user/query.js';
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