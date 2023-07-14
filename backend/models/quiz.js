const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
    test: {type: String, required: true}
});

module.exports = mongoose.model('Quiz', quizSchema)