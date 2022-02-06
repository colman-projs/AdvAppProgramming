const mongoose = require("mongoose");

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            dbName: "AdvProg",
        });
    } catch (e) {
        console.error(e);
    }
};

module.exports = connectDB;
