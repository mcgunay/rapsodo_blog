const mongo = require('../../common/services/service.mongo');
const ObjectId = require('mongodb').ObjectID;

const UserData = {
    username: String,
    email: String,
    password: String,
    follows: Array
}
createUser = (userData) => {
    col = mongo.getDB().collection('User');
    return col.findOne({$or:[{username:userData.username},{email:userData.email}]}).then((result) => {

        if(result != null)
         throw "Already exist";
 
         return  col.insertOne({
                     username:userData.username,
                     password:userData.password,
                     email:userData.email,
                     follows:[]},).then((result) => {
                         return result;
                     });
    });
};

findByEmail = (user_username) => {
    col = mongo.getDB().collection('User');
    return col.findOne({username:user_username}).then((result) => {return result;})
}

publishPost = (postData) => {
    col = mongo.getDB().collection('Post');
    return col.insertOne({user_id:ObjectId(
        postData.userId), 
        status:postData.status, 
        title:postData.title, 
        text: postData.text, 
        tag:postData.tag})
    .then((result) => {return result;});

}

getUserByUserId = (body) => {
    col = mongo.getDB().collection('User');
    return col.findOne({_id:ObjectId(body.user_id)}).then((result) => {
        if(result == null)
            throw "Not Found";

        return result;
    })
}

getAllUsers = (callback) => {
    col = mongo.getDB().collection('User');
    return col.find().toArray(function(err, docs) {
        return callback(err,docs);
    });
   
}

followUser = (body) => {
    col = mongo.getDB().collection('User');
    return col.findOneAndUpdate(
        {_id:ObjectId(body.user_id)}, 
        {$push:{"follows": ObjectId(body.usertofollow)}}).then((result) => {
            if(result == null)
                throw "Not Found";
    
            return result;
        });
}

unFollowUser = (body) => {
    col = mongo.getDB().collection('User');
    return col.findOneAndUpdate(
        {"_id":ObjectId(body.user_id)}, 
        {$pull:{"follows": ObjectId(body.usertofollow)}}).then((result) => {
            if(result == null)
                throw "Not Found";
    
            return result;
        });
}

getFollowingPosts = (body, callback) => {
    col = mongo.getDB().collection('User');
    col.findOne({_id:ObjectId(body.user_id)}).then((result) => {
        if(result == null)
            throw "Not Found";

        col = mongo.getDB().collection('Post').find({$and: [{user_id:{ $in: result.follows}}, {state:"public"}]}).toArray(function (err, docs) {
            return callback(err, docs);
          });
        
    })
}

makeComment = (body) => {
    col = mongo.getDB().collection('Comment');

    return  col.insertOne({
                     post_id:ObjectId(body.post_id),
                     user_id:ObjectId(body.user_id),
                     text:body.text,
                     }).then((result) => {
                         return result;
                     });
   
}

module.exports = {createUser, findByEmail, publishPost, getUserByUserId, getAllUsers, followUser, unFollowUser, getFollowingPosts, makeComment};