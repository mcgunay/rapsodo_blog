const jwtSecret = require('../../common/config/env.config.js').jwt_secret,
jwt = require('jsonwebtoken');
const crypto = require('crypto');
const uuid = require('uuid');

login = (req, res) => {
    try {
        let token = jwt.sign(req.body, jwtSecret);//For the sake of simplicity token does not expire
            //{expiresIn:"60s"});
        res.status(201).send({accessToken: token, userId: req.body.userId});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

module.exports = {login};