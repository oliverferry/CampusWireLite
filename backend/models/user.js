var mongoose = require('mongoose');
//schema
var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
// Export User Model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit); 
}