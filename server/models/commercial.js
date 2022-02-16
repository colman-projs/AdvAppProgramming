const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Commercial = new Schema({
    name: String,
    screenId: Number,
    messages: [String],
    images: [String],
    template: String,
    durationInSeconds: Number,
    timeSets: [
        {
            startDate: Date,
            endDate: Date,
            daysInWeek: [Number],
        },
    ],
});

module.exports = mongoose.model('commercials', Commercial);
