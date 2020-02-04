const jwt = require('jsonwebtoken');
const User = require('../../user/model/users.model');
const crypto = require('crypto');
const secret = require('../../common//config/env.config').jwt_secret;
hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.username) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing username and password fields'});
    }
};

isUsernamePasswordMatch = (req, res, next) => {
    User.findByEmail(req.body.username).then((user)=>{
            if(user == null){
                res.status(404).send({});
            }else{
                let passwordFields = user.password.split('$');
                let salt = passwordFields[0];
                let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (hash === passwordFields[1]) {
                    req.body = {
                        userId: user._id,
                        email: user.email,
                        name: user.username,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid username or password']});
                }
            }
        });
};

validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};

module.exports = {isUsernamePasswordMatch, hasAuthValidFields, validJWTNeeded};