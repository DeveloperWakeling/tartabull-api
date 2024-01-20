const express = require('express');
const app = express();
const port = 8080;
const question = require('./routes/question.js');
const user = require('./routes/user.js');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use('/question', question);
app.use('/user', user);

mongoose.connect(process.env.CONNECTIONSTRING).catch((err) => console.log(err));
// [] Authentication
// [] Database
// [] Logging ?
// [] Admin

app.get('/', (req, res) => {
    res.send("Tartabull API");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
