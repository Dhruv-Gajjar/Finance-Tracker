const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
const connectDB = (url) => {
    return mongoose.connect(url, () => console.log("Connected to MongoDB"))
}

module.exports = connectDB