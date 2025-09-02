import { expect } from 'chai'
import gqlRequest from "../../../utils/gqlRequest.js";
import { userCreateQ, userGetByIdQ } from "./queries.js";
import { userCreateI } from "./data.js";

let postData = null
let respData = null
let userId = null

describe("USER GET BY ID", () => {
  describe("USER GET BY ID - POSITIVE", () => {
    before("should create a user", (done) => {
      postData = {
        query: userCreateQ,
        variables: userCreateI
      }
      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          userId = res.body.data.userCreate._id
          return done();
        });
    })

    it("user get by id", (done) => {
      postData = {
        query: userGetByIdQ,
        variables: {
          userId: userId
        }
      }
      gqlRequest(postData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          respData = res.body.data.userGetById
          expect(respData._id).eq(userId)
          expect(respData.firstName).eq(userCreateI.userInput.firstName)
          expect(respData.lastName).eq(userCreateI.userInput.lastName)
          return done();
        });
    })
  })
  describe.skip("USER GET BY ID - NEGATIVE", () => {
  })

})
