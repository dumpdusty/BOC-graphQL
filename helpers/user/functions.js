import gqlRequest from '../../helpers/gqlRequest.js';
import { userCreateQuery, userDeleteByIdQuery } from '../../helpers/user/query.js';
import { userCreateData } from '../../helpers/user/data.js';



class User {
    async createUser(query = userCreateQuery, variables = userCreateData, statuscode = 200) {
        return (await gqlRequest({
        query: query,
        variables: variables
        }).expect(statuscode)).body
    }

    async deleteUserById(userId, query = userDeleteByIdQuery, statusCode = 200){
        return (await gqlRequest({
            query: query,
            variables: {
                userId: userId
            }
        }).expect(statusCode)).body
    }

}




export default new User()