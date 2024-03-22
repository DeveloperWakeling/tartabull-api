const express = require('express');
const router = express.Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

// Middleware specific to this router
router.use((req,res,next) =>{
    console.log("user route");
    next();
});

router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }) 
        .exec().then(user => {
            if(!user){
                res.status(404).send({message: "User not found" });
                return;
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid){
                res.status(404).send({
                    accessToken: null,
                    message: "Invalid Password"
                });
                return;
            }

            var token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 86400   
            });

            res.status(200).send({
                accessToken: token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                message: "User login Successful"
            });
        }).catch(err => {
                res.status(500).send({message: err });
        });
});

router.post('/register', (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(u => {
            res.status(200).send({message: "User created successfully" });
    }).catch(err => {
            res.status(500).send({message: err });
    });
});


module.exports = router;
