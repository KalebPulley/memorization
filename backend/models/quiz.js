const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    title: {type: String, required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true}
});

module.exports = mongoose.model('Quiz', quizSchema)