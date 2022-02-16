const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Commercial = new Schema({
    name: {
        type: String,
        required: true,
    },
    screenId: {
        type: Number,
        required: true,
    },
    messages: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    template: {
        type: String,
        required: true,
    },
    durationInSeconds: {
        type: Number,
        required: true,
    },
    timeSets: {
        type: [
            {
                startDate: {
                    type: Date,
                    required: true,
                },
                endDate: {
                    type: Date,
                    required: true,
                },
                daysInWeek: [Number],
            },
        ],
        required: true,
    },
});

module.exports = mongoose.model('commercials', Commercial);
