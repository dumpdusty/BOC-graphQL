import { expect } from 'chai'
import gqlRequest from "../../../utils/gqlRequest.js";
import { commentCreateQ } from './queries.js'
import { commentCreateI } from './data.js'

let postData = null

describe("COMMENT CREATE", () => {
  describe("COMMENT CREATE - POSITIVE", () => {
    it("should create a comment", (done) => {
      postData = {
        query: commentCreateQ,
        variables: commentCreateI
      }

      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data
          console.log(respData)
          // expect(respData.firstName).eq(userCreateI.userInput.firstName)
          // expect(respData.lastName).eq(userCreateI.userInput.lastName)
          return done();
        });
    })
  })
  describe.skip("COMMENT CREATE - NEGATIVE", () => {

  })
})
