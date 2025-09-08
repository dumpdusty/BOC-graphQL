import gqlRequest from '../../helpers/gqlRequest.js';
import { userCreateQuery, userDeleteByIdQuery, userGetAllQuery } from '../../helpers/user/query.js';
import { userCreateData, userGetAllData } from '../../helpers/user/data.js';



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

    async getAllUsers(query = userGetAllQuery, variables = userGetAllData, statusCode =200) {
        return (await gqlRequest({
            query,
            variables
        }).expect(statusCode)).body
    }

}




export default new User()