const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const question = require('./routes/question.js');
const user = require('./routes/user.js');
const answer = require('./routes/answer.js');
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.json());
app.use('/question', question);
app.use('/user', user);
app.use('/answer', answer);

mongoose.connect(process.env.CONNECTIONSTRING).catch((err) => console.log(err));
// [] Authentication
// [] Admin

app.get('/', (req, res) => {
    res.send("Tartabull API");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
