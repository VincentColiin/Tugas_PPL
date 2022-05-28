const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get('/', async (req, res) => {
    await User.find({}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).json({
            message: err
        })
    })
})

router.post("/register", async (req, res) => {
  var tempUser = req.body;
    if (tempUser.username != undefined && tempUser.password != undefined) {
        const newUser = new User({
            username: tempUser.username,
            password: tempUser.password
        })
        await newUser.save();
        res.status(200).send({ message: "User sudah tersimpan" });
    } else {
        res.status(418)
        .send({ message: "username/password tidak memenuhi kriteria" });
    }
});

router.post("/login", async (req, res) => {
    var tempUser = req.body;
    var username = req.body.username;
    var oldUser = await User.findOne({username});
    if (oldUser != null && oldUser.password == tempUser.password) {
    res.status(200).send({ message: "login berhasil" });
    } else {
    res.status(418).send({ message: "username/password salah" });
    }
});

module.exports = router;

