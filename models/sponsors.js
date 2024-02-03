const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sponsor = new Schema({
    name: String,
    logo: String,
    addedDate: Date,
    removedDate: Date,
});

const SponsorModel = mongoose.model("Sponsore", sponsor);

module.exports = SponsorModel;
