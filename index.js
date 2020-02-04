const config = require('./common/config/env.config.js');
var mongo = require("./common/services/service.mongo");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const UsersRouter = require('./user/routes.config');
const AuthenticationRouter = require('./authentication/routes.config');

mongo.connectDB(function(err, data){
    if(data)
        app.emit('ready');
});

app.use(function (req, res, next) {
    next();
});

app.use(bodyParser.json());
AuthenticationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.on('ready', function() { 
    app.listen(config.port, function () {
        console.log('app listening at port %s', config.port);
    }); 
});

process.on('SIGTERM', () => {
    disconnectDB();
  });