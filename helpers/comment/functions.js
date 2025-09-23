import gqlRequest from '../../helpers/gqlRequest.js';
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

    async createComment(query, variables, statuscode = 200) {
            return (await gqlRequest({
            query,
            variables
            }).expect(statuscode)).body
        }
}


export default new Comment()