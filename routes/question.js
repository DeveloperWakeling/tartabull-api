const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
var Answer = require('../models/answer.js');
var Question = require('../models/question.js');

// Middleware specific to this router
router.use((req,res,next) =>{
    console.log("question route");
    next();
});

// Need to figure out how to get next question for specific user
router.get('/', (req, res) => {
    res.send('Questions Route');
});

// Creating a question
router.post('/', verifyToken, (req, res) => {
    var requestUser = req.user;
    if(!requestUser){
        res.status(403).send({message: "Invalid Token"});
    }
    else if(requestUser.role != "admin"){
        res.status(401).send({message: "Unauthorized"});
    }
    else {
        const question = new Question({
            type: req.body.type,
            questionText: req.body.questionText,
            availableAnswers: req.body.availableAnswers
        });

        question.save().then(_ => {
            res.status(200).send({message: "Question Created"});
        }).catch(err =>{
            res.status(500).send({message: err});
        });
    }
});

// Answering a question
router.post('/:questionId', verifyToken, (req, res) => {
    var requestUser = req.user;
    if(!requestUser){
        res.status(403).send({message: "Invalid Token"});
    }
    else {
        const answer = new Answer({
            answer: req.body.answer,
            user: requestUser.id,
            question: req.params.questionId
        });

        answer.save().then(_ => {
            res.status(200).send({message: "Question Answered"});
        }).catch(err =>{
            res.status(500).send({message: err});
        });
    }
});

module.exports = router;
