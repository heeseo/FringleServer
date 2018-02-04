var Group = require('../models/todo');
var User = require('../models/user');
var PushController = require('./push'); 


exports.getTodos = function(req, res, next){
 
    /*Todo.find(function(err, todos) {
 
        if (err){
            res.send(err);
        }
 
        res.json(todos);
 
    });*/
 
    
    var user = req.user;
    //var macs;
    User.findOne({_id: user._id }, 'devices',  {lean: true }, function(err, doc) {
        if(err){
            res.send(err);
        }
        var macs = doc.devices;
        Group.find({ mac: {$in: macs}}, function(err, docs) {
            if (err){
                res.send(err);
            }

            res.json(docs);
        });
        //res.json(macs);
        //var macs = docs.map(function(doc) { return doc.mac; });
        //var macs = doc.devices;
        
    });
    

    
}
 
exports.createTodo = function(req, res, next){
    //var imgurl = req.query.url;
    //imgurl = imgurl.replace("glofendprocessed/", "");
    var macAddress = imgurl.substring(0, imgurl.indexOf("/") );
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
        mac : macAddress,
        url : imgurl
    }, function(err, todo) {
 
        if (err){
            res.send(err);
        }
        console.log("matched result: "+ todo);

 
        User.find({
                devices: {$elemMatch:{"mac":macAddress,"priority":true}}       
            },'fcmtoken',function(err, todos) {
 
            if (err){
                res.send(err);
            }
            //console.log("matched result2: "+ todos);
            //todos.forEach(function(element) {
                PushController.sendPush(todos);

            //});
            res.send("Successful");
 
        });
 
    });
 
}
 
exports.deleteTodo = function(req, res, next){
 
    Group.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        res.json(todo);
    });
 
}