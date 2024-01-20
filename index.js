const express = require('express');
const app = express();
const port = 8080;
const question = require('./routes/question.js');
const user = require('./routes/user.js');
const mongoose = require('mongoose');
const Question = require('./models/question.js');

require('dotenv').config();

app.use(express.json());
app.use('/question', question);
app.use('/user', user);

mongoose.connect(process.env.CONNECTIONSTRING).catch((err) => console.log(err));
// [] Authentication
// [] Admin

app.get('/', (req, res) => {
    res.send("Tartabull API");
});

app.get('/tester', (req, res) => {
    let questiontest = new Question({
        type: "test",
        answers: ["test", "tester"]
    });

    questiontest.save().then(tester => {
        res.send(tester);
    }).catch(err => console.log(err));

});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
