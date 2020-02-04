const User = require('../model/users.model');
const crypto = require('crypto');

insertUser = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    User.createUser(req.body).then((result) => {
            res.status(201).send({id: result.insertedId});
        }).catch((result) => {
            res.status(409).send({message:result});
        });
};

publishPost = (req, res) => {
    User.publishPost(req.body).then((result) => {
        res.status(201).send({id: result.insertedId});
    }).catch((err) => {
        res.status(409).send({message:err});
    });
};

getUserByUserId = (req, res) => {
    User.getUserByUserId(req.body).then((result) =>{
        res.status(200).send({result});
    }).catch((err) => {
        res.status(404).send({result});
    });
};

//Cannot be returned by promise
getAllUsers = (req, res) => {
    User.getAllUsers(function(err,data){
        if(err)
            res.status(404).send({data});
        res.status(200).send({data});
        
    });
    
}

followUser = (req, res) => {
    User.followUser(req.body).then((result) =>{
        res.status(200).send({result});
    }).catch((err) => {
        res.status(404).send({result});
    });
};

unFollowUser = (req, res) => {
    User.unFollowUser(req.body).then((result) =>{
        res.status(200).send({result});
    }).catch((err) => {
        res.status(404).send({result});
    });
};

getFollowingPosts = (req, res) => {
    User.getFollowingPosts(req.body, function(err,data){
        if(err)
            res.status(404).send({data});
        res.status(200).send({data});
        
    });
}

makeComment = (req, res) => {
    User.makeComment(req.body).then((result) => {
        res.status(201).send({id: result.insertedId});
    }).catch((err) => {
        res.status(409).send({message:err});
    });
}; 


 
module.exports = {insertUser, publishPost, getUserByUserId, getAllUsers, followUser, unFollowUser, getFollowingPosts, makeComment};