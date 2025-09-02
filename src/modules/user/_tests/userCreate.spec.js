import { expect } from 'chai'
import gqlRequest from "../../../utils/gqlRequest.js";
import { userCreateQ, userCreateQInv } from './queries.js'
import { userCreateI } from './data.js'

let postData = null

describe("USER CREATE", () => {
  describe("USER CREATE - POSITIVE", () => {
    it("should create a user", (done) => {
      postData = {
        query: userCreateQ,
        variables: userCreateI
      }

      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.data.userCreate
          console.log(respData)
          expect(respData.firstName).eq(userCreateI.userInput.firstName)
          expect(respData.lastName).eq(userCreateI.userInput.lastName)
          return done();
        });
    })
  })
  describe("USER CREATE - NEGATIVE", () => {
    it("invalid schema", (done) => {
      postData = {
        query: userCreateQInv,
        variables: userCreateI
      }

      gqlRequest(postData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          const respData = res.body.errors[0].message
          expect(respData).eq( 'Cannot query field "firstName_" on type "User". Did you mean "firstName" or "lastName"?',)
          return done();
        });
    })
  })
})
