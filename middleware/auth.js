const jwt = require("jsonwebtoken");
var User = require("../models/user");

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, function(err, decode){
            if(err) {
                req.user = undefined;
                next();
            }
            else {
                User.findOne({_id: decode.id}).exec().then(user => {
                    req.user = user;
                    next();
                }).catch(err => {
                    res.status(500).send({ message: err});
                });
            }
        });
    }
    else {
        req.user = undefined;
        next();
    }
}

module.exports = verifyToken;
