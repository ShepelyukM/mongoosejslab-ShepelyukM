const mongoose = require('mongoose');

const db = 'mongodb+srv://shepeliukmaksym:kobolchin11@cluster0.ewtljp6.mongodb.net/databasemax';
async function connectToDb() {
    await mongoose.connect(db);
}

mongoose.connection.on('error', err => {
    console.log(err);
});

module.exports = () =>
    connectToDb()
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(console.log);
