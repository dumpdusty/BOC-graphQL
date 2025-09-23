import gqlRequest from '../../helpers/gqlRequest.js';
import { commentDeleteByIdQuery } from './query.js';
import Chance from 'chance'
const chance = new Chance()

class Comment {


    async buildCommentCreateData(userId) {
        return {
            "commentInput": {
                "userId": userId,
                "description": chance.sentence(),
                "rating": chance.integer({min: 1, max: 4}),
                "title": chance.word()
            }
        }
        
    }    

    async createComment(query, variables, statusCode = 200) {
            return (await gqlRequest({
            query,
            variables
            }).expect(statusCode)).body
    }
    
    async deleteCommentById(commentId, query = commentDeleteByIdQuery, statusCode = 200) { 
        return (await gqlRequest({
                    query,
                    variables: {
                        commentId
                    }
                }).expect(statusCode)).body
    }
}


export default new Comment()