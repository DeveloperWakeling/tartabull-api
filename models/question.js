const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const question = new Schema({
    type: String,
    questionText: String,
    availableAnswers: [String],
    createdDate: {
        type: Date,
        default: Date.now
    },
    sponsor: { 
        type: mongoose.Schema.ObjectId,
        ref: "Sponsor"
    },
    closedDate: Date
});

const QuestionModel = mongoose.model("Question", question);

module.exports = QuestionModel;
