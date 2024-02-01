const express = require('express');
const app = express();
const port = 8080;
const question = require('../routes/question.js');
const user = require('../routes/user.js');
const mongoose = require('mongoose');
const Question = require('../models/question.js');
const verifyToken = require('../middleware/auth.js');

require('dotenv').config();

app.use(express.json());
app.use('/question', question);
app.use('/user', user);

mongoose.connect(process.env.CONNECTIONSTRING).catch((err) => console.log(err));
// [] Authentication
// [] Admin
app.get('/authorizedroute', verifyToken, (req, res) => {
    var requestUser = req.user;
    if(!requestUser){
        res.status(403).send({message: "Invalid Token"});
    }
    if(requestUser){
        if(requestUser.role == "admin"){
            res.status(200).send({authorized: true});
        }
        else {
            res.status(200).send({authorized: false});
        }
    }
});

app.get('/', (req, res) => {
    res.send("Tartabull API");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Vercel integration
module.exports = app;
