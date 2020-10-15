const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const config = require("../config/db");

const UserShema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    role: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserShema);

module.exports.getUserByLogin = function(login, callback){
    const query = {login: login};
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePass = function(passFromUser, userDBPass, callback){
    bcrypt.compare(passFromUser, userDBPass, ( err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};