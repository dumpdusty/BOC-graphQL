import { expect } from 'chai'
import { commentCreateQuery } from '../../helpers/comment/query.js'
import user from '../../helpers/user/functions.js'
import comment from '../../helpers/comment/functions.js'


let responseData;
let commentCreateRandomData;
let newUser;
let commentId;

describe('COMMEND DELETE BY ID POSITIVE', () => {
      before(async () => {
        newUser = (await user.createUser()).data.userCreate
        commentCreateRandomData = await comment.buildCommentCreateData(newUser._id)
        commentId = (await comment.createComment(commentCreateRandomData, commentCreateQuery)).data.commentCreate._id
        responseData = (await comment.deleteCommentById(commentId)).data
      })
    
    it('verify comment deleted', async () => {
        expect(responseData.commentDeleteById).eq(1)
    })

    after(async () => {
        await user.deleteUserById(newUser._id)
    })
})