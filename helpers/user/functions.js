import gqlRequest from '../../helpers/gqlRequest.js';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData } from '../../helpers/user/data.js';

 const userCreateRequestData = {
        query: userCreateQuery,
        variables: userCreateData
}

export async function userCreate(query = userCreateQuery, variables = userCreateData, statuscode = 200) {
    return (await gqlRequest({
        query: query,
        variables: variables
    })
        .expect(statuscode)).body
}