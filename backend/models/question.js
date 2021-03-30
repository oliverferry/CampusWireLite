var mongoose = require('mongoose');
//schema
var questionSchema = mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
});
// Export User Model
var Question = module.exports = mongoose.model('question', questionSchema);
module.exports.get = function (callback, limit) {
   Question.find(callback).limit(limit); 
}