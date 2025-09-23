import { expect } from 'chai'
import { commentCreateQuery, commentDeleteByIdQuery } from '../../helpers/comment/query.js'
import user from '../../helpers/user/functions.js'
import comment from '../../helpers/comment/functions.js'
import gqlRequest from '../../helpers/gqlRequest.js';



let responseData;
let buildedCommentData;
let userId;
let commentId;

describe('COMMENT CREATE NEGATIVE', () => {
    before(async () => {
        userId = (await user.createUser()).data.userCreate._id
        console.log(userId)
        buildedCommentData = await comment.buildCommentCreateData(userId)
        responseData = (await comment.createComment(commentCreateQuery, buildedCommentData)).data.commentCreate
        commentId = responseData._id
        
    })

    it('verify created comment has an id', async () => {
        expect(commentId).to.be.a('string')
    })


    after(async () => {
        await user.deleteUserById(userId)
        await comment.deleteCommentById(commentId)
    })
})

