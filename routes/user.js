const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  var tempUser = req.query;
  if (tempUser.username != undefined && tempUser.password != undefined) {
    user.username = tempUser.username;
    user.password = tempUser.password;
    res.status(200).send({ message: "User sudah tersimpan" });
  } else {
    res
      .status(418)
      .send({ message: "username/password tidak memenuhi kriteria" });
  }
});

router.get("/login", async (req, res) => {
  var tempUser = req.query;
  if (
    tempUser.username == user.username &&
    tempUser.password == user.password
  ) {
    res.status(200).send({ message: "login berhasil" });
  } else {
    res.status(418).send({ message: "username/password salah" });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> dev
