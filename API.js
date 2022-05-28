const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const config = require('config');

const port = 8080;
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.text());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ type: 'application/json' }))

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('err', console.error.bind(console, 'connection error:'));
mongoose.connection.on('open', () => {
    console.log('Connected to DataBase');
})

if (config.util.getEnv('NODE_ENV') != 'test') app.use(morgan('combined'));

app.use('/user', require('./routes/user'));

app.get('/', async (req, res) => {
    res.status(200).send('Connected');
})

app.listen(
    port,
    () => console.log('API berjalan di Port : ' + port)
);

module.exports = app;