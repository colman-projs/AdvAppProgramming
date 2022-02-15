const mongoose = require('mongoose');

const Admins = new mongoose.Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('admins', Admins);
