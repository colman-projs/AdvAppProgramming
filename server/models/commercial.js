const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commercials = new Schema({
    name: String,
    screenId: Number,
});

module.exports = mongoose.model("commercials", commercials);
