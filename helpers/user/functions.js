import gqlRequest from '../../helpers/gqlRequest.js';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData } from '../../helpers/user/data.js';



class User {
    async createUser(query = userCreateQuery, variables = userCreateData, statuscode = 200) {
        return (await gqlRequest({
        query: query,
        variables: variables
    })
        .expect(statuscode)).body
    }
}

export default new User()