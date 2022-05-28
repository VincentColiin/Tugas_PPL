process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const chaihttp = require("chai-http");
const chai = require("chai");

const User = require("../models/User");
const server = require("../API");

let should = chai.should();
chai.use(chaihttp);

describe("User", () => {
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe("/GET Users", () => {
    it("Menampilkan semua user", (done) => {
      chai
        .request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST Register", () => {
    it("Mendaftarkan user", (done) => {
      let user = {
        username: "user123",
        password: "12345678",
      };
      chai
        .request(server)
        .post("/user/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("User sudah tersimpan");
          done();
        });
    });
    it("Mendaftarkan user tanpa password", (done) => {
      let user = {
        username: "user123",
      };
      chai
        .request(server)
        .post("/user/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(418);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("username/password tidak memenuhi kriteria");
          done();
        });
    });
  });

  describe("/POST Login", () => {
    it("Login dengan username dan password yang benar", (done) => {
      let user = new User({
        username: "user123",
        password: "12345678",
      });
      user.save((err) => {
        chai
          .request(server)
          .post("/user/login")
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("login berhasil");
            done();
          });
      });
    });
    it("Login dengan password yang salah", (done) => {
      let user = new User({
        username: "user123",
        password: "12345678",
      });
      user.save((err) => {
        chai
          .request(server)
          .post("/user/login")
          .send({
            username: "user123",
            password: "1234567890",
          })
          .end((err, res) => {
            res.should.have.status(418);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("username/password salah");
            done();
          });
      });
    });
  });
});
