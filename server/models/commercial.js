const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commercials = new Schema({
    name: String
})

module.exports = mongoose.model('commercials', commercials)