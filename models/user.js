const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: [true, 'Username already exists'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Email not provided"]
    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        default: "normal"
    },
    password: {
        type: String,
        required: [true, "Password not provided"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model("User", user);

module.exports = UserModel;
