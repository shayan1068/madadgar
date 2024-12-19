require('dotenv').config();
const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch(err => {
        console.error(`Database connection error: ${err}`);
        process.exit(1);
    });
};

module.exports = connectDatabase;
