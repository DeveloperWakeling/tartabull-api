const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.js');
var Answer = require('../models/answer.js');

// Middleware specific to this router
router.use((req,res,next) =>{
    console.log("answer route");
    next();
});

// get all answers
router.get('/', verifyToken, (req, res) => {
    console.log("here");
    var requestUser = req.user;
    if(!requestUser){
        res.status(403).send({message: "Invalid Token"});
    }
    if(requestUser){
        if(requestUser.role == "admin"){
            Answer.find({}).populate('question', 'questionText').populate('user', 'username').exec().then(answers => {
                res.status(200).send({answers: answers});
            }).catch(err => res.status(500).send({message: err}));
        }
        else {
            res.status(401).send({message: "Unauthorized"});
        }
    }
});

module.exports = router;
