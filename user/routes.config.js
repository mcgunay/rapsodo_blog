const UsersController = require('./controller/users.controller');
const AuthenticationMiddleware = require('../authentication/middleware/verify.middleware');
module.exports.routesConfig = function (app) {
    app.post('/user', [
        UsersController.insertUser
    ]);

    app.post('/user/publish', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.publishPost
    ]);

    app.put('/user/follow', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.followUser
    ]);

    app.put('/user/unfollow', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.unFollowUser
    ]);

    app.get('/user/:user_id', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.getUserByUserId
    ]);

    app.get('/user', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.getAllUsers
    ]);

    app.get('/user/:user_id/posts', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.getFollowingPosts
    ]);

    app.post('/user/:user_id/post/:post_id/comment', [
        AuthenticationMiddleware.validJWTNeeded,
        UsersController.makeComment
    ]);

};