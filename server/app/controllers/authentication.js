var jwt = require('jsonwebtoken');  
var User = require('../models/user');
var authConfig = require('../../config/auth');
var Group = require('../models/todo');

function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role,
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}
 
exports.register = function(req, res, next){
 
    var email = req.body.email;
    var password = req.body.password;
    var role = req.body.role;
 
    if(!email){
        return res.status(422).send({error: 'You must enter an email address'});
    }
 
    if(!password){
        return res.status(422).send({error: 'You must enter a password'});
    }
 
    User.findOne({email: email}, function(err, existingUser){
 
        if(err){
            return next(err);
        }
 
        if(existingUser){
            return res.status(422).send({error: 'That email address is already in use'});
        }
 
        var user = new User({
            email: email,
            password: password,
            role: role,

        });
 
        user.save(function(err, user){
 
            if(err){
                return next(err);
            }
 
            var userInfo = setUserInfo(user);
 
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
 
        });
 
    });
 
}
 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.findById(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}



//add-device appended
exports.addDevice = function(req, res, next){
    
    var macAddress = req.body.mac;
    var password = req.body.password;
    var user = req.user;
    ///
    
    if(!macAddress){
        return res.status(422).send({error: 'You must enter a MAC address'});
    }
 
    User.findOneAndUpdate({
        _id: user._id,
    }, {
        $push: { 
            devices: {
                mac: macAddress
            } 
        }
    }, {
        upsert: true
    }, function(err, todo){
        if(err){
            res.send(err);
        }
        res.status(200).send({content: "Successfully added"});
        //res.send("Successfully added");
    });
    /*
    Todo.create({
        title : req.body.title
    }, function(err, todo) {
 
        if (err){
            res.send(err);
        }
 
        Todo.find(function(err, todos) {
 
            if (err){
                res.send(err);
            }
 
            res.json(todos);
 
        });
 
    });
 */
}


exports.deleteDevice = function(req, res, next){
    /*var user = req.user;
    User.findOneAndUpdate({
        _id: user._id
    },{
        $pull:{ devices : req.params.dv_id} }, 
        function(err, data){
            if(err){
                res.send(err);
            }
            res.status(204).send("Successfully deleted");
    });
    */
    
    /*
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });
 */
}

exports.getSetting = function(req, res, next){
    var user = req.user;
    User.findById( user._id, 
        function(err, data){
            if(err){
                res.send(err);
            }
            console.log(data);

            res.json(data);
    });
    /*
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });
 */
}

exports.setProfile = function(req, res, next){
    var user = req.user;
    var userID = req.body.userID;
    var lname = req.body.lname;
    var fname = req.body.fname;
    var dob = req.body.dob;
    var gender = req.body.gender;
    var status = req.body.status;
    var city = req.body.city;
    var county = req.body.county;
    var country = req.body.country;
    var hobbies = req.body.hobbies;
    var details = req.body.details;
    var interest = req.body.interest;
    
    console.log(user);
    console.log(user.fname);

    User.findByIdAndUpdate(user._id, { $set: { "fname":fname, "userID":userID, "lname":lname,"dob":dob,"gender":gender,"status":status,"city":city,"county":county,"country":country,"hobbies":hobbies,"details":details,"interest":interest }}, { new: true }, function (err, usr) {
      if (err) return next(err);
      res.send(usr);
    });
    
    
    /*
    User.findOneAndUpdate({
        _id: user._id,
    }, {
        $push: { 
            devices: {
                mac: macAddress
            } 
        }
    }, {
        upsert: true
    }, function(err, todo){
        if(err){
            res.send(err);
        }
        res.status(200).send({content: "Successfully added"});
        //res.send("Successfully added");
    });
    
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });
 */
}

exports.createGroup = function(req, res, next){
    var user = req.user;
    var name = req.body.groupName;
    var userID = user._id;
    var status = req.body.status;
    var description = req.body.description;
    var interests = req.body.interests;
    var area = req.body.area;
    //var members = req.body.member;

    //var imgurl = req.query.url;
    //imgurl = imgurl.replace("glofendprocessed/", "");
    //var macAddress = imgurl.substring(0, imgurl.indexOf("/") );
    /*
    Todo.findOneAndUpdate({
        mac: macAddress,
    }, {
        $push: { 
            image: {
                url: imgurl
            } 
        }
    }, {
        upsert: true
    }, function(err, todo){
        if(err){
            res.send(err);
        }
        
        res.send("Successfully added");
    });*/

    Group.create({
        name : name,
        userID : userID,
        status : status,
        description: description,
        interests : interests,
        area :area
    }, function(err, group) {
 
        if (err){
            next(err);
        }
        console.log("successful: "+ group);

      res.send({
        message: 'successful'
      });
       
 
    });
 
}

exports.sendInvitation = function(req, res, next){

}

exports.joinGroup = function(req, res, next){
    var user = req.user;    
    var accessKey = req.body.accessKey;
    
    Group.findOneAndUpdate({_id:accessKey}, { $push: { "members":user._id}}, { upsert:true, new: true }, function (err, usr) {
      if (err) return next(err);
      res.send(usr);
    });    
}
