var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var deviceSchema = new mongoose.Schema({
    mac:{
        type: String
    },
    priority:{
        type: Boolean,
        default: true      
    },
    message:{
        type: Boolean,
        default: true 
    },
    entry:{
        type: Boolean,
        default: true      
    },
    bell:{
        type: Boolean,
        default: true      
    },
    visitor:{
        type: Boolean,
        default: true      
    },
    exit:{
        type: Boolean,
        default: true      
    },
    distress:{
        type: Boolean,
        default: true      
    },
});

var UserSchema = new mongoose.Schema({
 
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    fname: {
        type: String,
        default: ''
    },
    lname: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['reader', 'creator', 'editor'],
        default: 'reader'
    },
    gender: {
        type: String,
        enum: ['female', 'male']
    },
    status: {
        type: String,
        enum: ['single','married',''],
        default: ''
    },
    city: {
        type: String,
    },
    county: {
        type: String
    },
    country: {
        type: String,
    },
    hobbies: {
        type: Array
    },
    detail: {
        type: String,
    },
    interest:{
        type: String,
        enum: ['girls', 'boys', 'any',''],
        default: ''
    },
    groups:{
        type: Array
    },
    joined:{
        type: Array
    },
    image:{
        type: String
    }

    /*devices: {
        type: Array
    }
}*/
     
}, {
    timestamps: true
});
 
UserSchema.pre('save', function(next){
 
    var user = this;
    var SALT_FACTOR = 5;
 
    if(!user.isModified('password')){
        return next();
    } 
 
    bcrypt.genSalt(SALT_FACTOR, function(err, salt){
 
        if(err){
            return next(err);
        }
 
        bcrypt.hash(user.password, salt, null, function(err, hash){
 
            if(err){
                return next(err);
            }
 
            user.password = hash;
            next();
 
        });
 
    });
 
});
 
UserSchema.methods.comparePassword = function(passwordAttempt, cb){
 
    bcrypt.compare(passwordAttempt, this.password, function(err, isMatch){
 
        if(err){
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
 
}
 
module.exports = mongoose.model('User', UserSchema);