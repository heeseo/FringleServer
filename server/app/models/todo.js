var mongoose = require('mongoose');
 
var GroupSchema = new mongoose.Schema({
 
    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    status:{
        type: String
    },
    description:{
        type: String
    },
    interests:{
        type: Array
    },
    area:{
        type: String
    },
    members:{
        type: Array
    }
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('groups', GroupSchema);


/*var mongoose = require('mongoose');
 
var TodoSchema = new mongoose.Schema({
 
    title: {
        type: String,
        required: true
    },
    Url: {
        type: String,
        required: true
    }
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Todo', TodoSchema);*/

/*
var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    name:{
        type: String
    },
    content:{
        type: String,
        required: true
    }
}, { 
    timestamps: true
});
var imageSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    message: [messageSchema]
});
var TodoSchema = new mongoose.Schema({
 
    mac: {
        type: String,
        required: true
    },
    image: [imageSchema]
 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('images', TodoSchema);*/