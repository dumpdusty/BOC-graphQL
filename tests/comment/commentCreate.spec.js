import { expect } from 'chai'
import { commentCreateQuery } from '../../helpers/comment/query.js'
import user from '../../helpers/user/functions.js'
import comment from '../../helpers/comment/functions.js'

let responseData;
let buildedCommentData;
let userId;

describe('COMMENT CREATE NEGATIVE', () => {
    before(async () => {
        userId = (await user.createUser()).data.userCreate._id
        buildedCommentData = await comment.buildCommentCreateData(userId)
        responseData = (await comment.createComment(commentCreateQuery, buildedCommentData)).data.commentCreate
        
    })

    it('verify created comment has an id', async () => {
        expect(responseData._id).to.be.a('string')
    })

    after(async () => {
        await user.deleteUserById(userId)
    })
})

