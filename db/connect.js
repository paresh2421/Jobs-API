const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "Jobs-API"
  });
}

module.exports = connectDB
