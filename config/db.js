const mongoose = require('mongoose');

const connection = async () => {
    const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`mongo db connected: ${dbConnection.connection.host}`.cyan.underline.bold)
}

module.exports = connection;