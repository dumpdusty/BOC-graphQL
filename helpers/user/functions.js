import gqlRequest from '../../helpers/gqlRequest.js';
import { userCreateQuery } from '../../helpers/user/query.js';
import { userCreateData, userCreateDataInvalid } from '../../helpers/user/data.js';

 const userCreateRequestData = {
        query: userCreateQuery,
        variables: userCreateData
    }

export async function userCreate(requestData = userCreateRequestData, statuscode = 200) {
    return (await gqlRequest(requestData).expect(statuscode)).body
}