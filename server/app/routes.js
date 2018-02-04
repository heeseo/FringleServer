var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        settingRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    authRoutes.post('/add-device', requireAuth, AuthenticationController.addDevice);
    
    authRoutes.post('/setProfile',requireAuth, AuthenticationController.setProfile );
    
    authRoutes.post('/createGroup',requireAuth, AuthenticationController.createGroup );
    //sendinv to be implemented
    authRoutes.get('/invite',requireAuth, AuthenticationController.sendInvitation );
    //joinGroup to be implemented
    authRoutes.post('/joinGroup',requireAuth, AuthenticationController.joinGroup );


    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
 
    todoRoutes.get('/', requireAuth, TodoController.getTodos);
    //todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    //testing request from aws
    todoRoutes.get('/insert', TodoController.createTodo);
    //
    todoRoutes.delete('/:todo_id', requireAuth, TodoController.deleteTodo);
 
    //settingRoutes
    apiRoutes.use('/settings',settingRoutes);
    //settingRoutes.delete('/remove-device/:dv_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), AuthenticationController.deleteDevice);
    settingRoutes.get('/', requireAuth, AuthenticationController.getSetting);

   
    // requireAuth, AuthenticationController.roleAuthorization(['editor']),
    // Set up routes
    app.use('/api', apiRoutes);
 
}