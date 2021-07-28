const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

//Load environment variables
dotenv.config({ path: './config/config.env' });

// Load router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// Load middlewares
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error-handler');
// Import DB files
const connectDB = require('./config/db')

connectDB();
const morgan = require('morgan');


const app = express();

//Middleware
//app.use(logger);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, console.log(`server running on ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));

// Handle unhandled promise rejection errors
process.on('unhandledRejection', (err, promise) => {
    console.log(`error: ${err.message}.red`);
    //close server and exit
    server.close(() => process.exit(1));
})