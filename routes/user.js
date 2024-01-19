const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req,res,next) =>{
    console.log("user route");
    next();
});

// This would be the route for /user/login
router.post('/login', (req, res) => {
    // username and password would be passed here
    // Passes in the answer and the userid of who answered it
    res.send({"user": "user"});
});

router.post('/register', (req, res) => {
    // username and password would be passed here
    // Passes in the answer and the userid of who answered it
    res.send({"user": "registration"});
});

router.post('/forgotpassword', (req, res) =>{
    // Sends an email for user password reset...
    res.send({"user": "forgotpassword"});
});

module.exports = router;
