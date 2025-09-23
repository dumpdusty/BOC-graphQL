import { expect } from 'chai'
import { commentCreateQuery } from '../../helpers/comment/query.js'
import user from '../../helpers/user/functions.js'
import comment from '../../helpers/comment/functions.js'



let responseData;
let commentCreateRandomData;
let newUser;
let commentId;

describe('COMMENT CREATE POSITIVE', () => {
    before(async () => {
        newUser = (await user.createUser()).data.userCreate
        commentCreateRandomData = await comment.buildCommentCreateData(newUser._id)
        responseData = (await comment.createComment(commentCreateRandomData, commentCreateQuery)).data.commentCreate
        commentId = responseData._id
     
    })

    it('verify created comment has an id', async () => {
        expect(commentId).to.be.a('string')
    })

    it('verify rating is in a range', async () => {
        expect(responseData.rating).within(1,4)
    })

    it('verify created at has value', async () => {
        const secondAgo = Date.now() - 1000
        const secondLater = Date.now() + 1000
        
        expect(+responseData.createdAt).within(secondAgo, secondLater)
    })

    it('verify description value', async () => {
        expect(responseData.description).eq(commentCreateRandomData.commentInput.description)
    })

    it('verify title value', async () => {
        expect(responseData.title).eq(commentCreateRandomData.commentInput.title)
    })

    it('verify user id', async () => {
        expect(responseData.user._id).eq(newUser._id)
    })

    it('verify user first name', async () => {
        expect(responseData.user.firstName).eq(newUser.firstName)
    })

    it('verify user last name', async () => {
        expect(responseData.user.lastName).eq(newUser.lastName)
    })

    


    after(async () => {
        await user.deleteUserById(newUser._id)
        await comment.deleteCommentById(commentId)
    })
})

