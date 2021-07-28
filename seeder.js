const mongoose = require('mongoose');
const colors = require('colors');
const fs = require('fs');

const dotenv = require('dotenv');

// import env variables 
dotenv.config({ path: './config/config.env' });

// Load models
const Bootcamp = require('./models/Bootcamp');
const Courses = require('./models/Course');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf8'));

// Import into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Courses.create(courses);
        console.log('Data imported successfully'.green.inverse)
        process.exit();
    } catch (error) {
        console.log(error)
        console.log('error in importing'.red)
    }
}


// delete into db
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Courses.deleteMany();
        console.log('Data destroyed successfully'.red.inverse)
        process.exit();
    } catch (error) {
        console.log('error in deleting', error)
    }
}

if (process.argv[2] == '-i') {
    importData();
}
else if (process.argv[2] == '-d') {
    deleteData();
}
