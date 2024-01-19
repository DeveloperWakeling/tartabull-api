const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req,res,next) =>{
    console.log("question route");
    next();
});

// This would be the route for /question
router.get('/', (req, res) => {
    res.send('Questions Route');
});

router.post('/', (req, res) => {
    // Answer the question here
    // Passes in the answer and the userid of who answered it
    res.send({"question": "answer"});
});

module.exports = router;
