process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chaihttp = require("chai-http");
const chai = require("chai");

const User = require("../models/User");
const server = require("../API");

const should = chai.should();
chai.use(chaihttp);

describe("User", () => {
  describe("/GET Users", () => {
    it("Menampilkan semua user", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a("array");
          res.body.length.should.be.eql(7);
          done();
        });
    });
  });
});
