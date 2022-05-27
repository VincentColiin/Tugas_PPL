const express = require('express');
const port = 8080;

const app = express();

app.use(express.json());

class User {
    contructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

var user = new User();

app.post('/register', async (req, res) => {
    var tempUser = req.query;
    if (tempUser.username != undefined && tempUser.password != undefined) {
        user.username = tempUser.username;
        user.password = tempUser.password;
        res.status(200).send({ message: 'User sudah tersimpan' });
    } else {
        res.status(418).send({ message: 'username/password tidak memenuhi kriteria' });
    }
})

app.get('/login', async(req, res) => {
    var tempUser = req.query;
    if (tempUser.username == user.username && tempUser.password == user.password) {
        res.status(200).send({ message: 'login berhasil' });
    } else {
        res.status(418).send({ message: 'username/password salah' });
    }
})

app.get('/', async (req, res) => {
    res.status(200).send('connected');
})

app.listen(
    port,
    () => console.log('API berjalan di Port : ' + port)
);

