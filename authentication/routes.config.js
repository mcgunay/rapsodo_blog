const VerifyUserMiddleware = require('./middleware/verify.middleware');
const AuthenticationController = require('./controller/authentication.controller');
//const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
module.exports.routesConfig = function (app) {

    app.post('/login', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isUsernamePasswordMatch,
        AuthenticationController.login
    ]);
};