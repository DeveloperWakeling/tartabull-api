const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const question = new Schema({
    type: String,
    answers: [String],
    createdDate: Date,
});

const QuestionModel = mongoose.model("Question", question);

module.exports = QuestionModel;
