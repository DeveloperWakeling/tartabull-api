const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const answer = new Schema({
    answer: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    answered: {
        type: String,
        default: Date.now
    }
});

const AnswerModel = mongoose.model("Answer", answer);

module.exports = AnswerModel;
