const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

<<<<<<< HEAD
router.get('/', (req, res) => {
    User.find({}).then((result) => {
        res.json(result);
    }).catch((err) => {
        res.status(500).json({
            message: err
        })
    })
})

router.post("/register", (req, res) => {
  var tempUser = req.body;
=======
router.get('/', async(req, res) => {
    try {
        const userList = await User.find({});
        res.json(userList);
    }
    catch {
        res.status(418).send({message: "ada masalah koneksi ke database"})
    }
})

router.post("/register", async(req, res) => {
  var tempUser = req.query;
>>>>>>> 3ee4156cb5390c0123f6a4460080082a1f8de530
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

<<<<<<< HEAD
router.post("/login", (req, res) => {
    var tempUser = req.body;
    var username = req.body.username
    var oldUser = User.findOne({username});
    if (oldUser != null && oldUser.password == tempUser.password) {
=======
router.post("/login", async(req, res) => {
    var password = req.query.password;
    var username = req.query.username;
    var oldUser = await User.findOne({username});
    if (oldUser != null && oldUser.password == password) {
>>>>>>> 3ee4156cb5390c0123f6a4460080082a1f8de530
    res.status(200).send({ message: "login berhasil" });
    } else {
    res.status(418).send({ message: "username/password salah" });
    }
});

module.exports = router;

