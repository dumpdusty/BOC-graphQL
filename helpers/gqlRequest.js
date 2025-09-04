import request from 'supertest'
const url = "http://127.0.0.1:5050"

export default function gqlRequest(requestData) {
  return request (url)
    .post('/')
    .send(requestData)
}
