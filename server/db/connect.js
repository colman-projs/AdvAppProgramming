const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true, 
    dbName: "AdvProg"
  })
}

module.exports = connectDB
