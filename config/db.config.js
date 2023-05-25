const mongoose = require('mongoose');

const db = 'mongodb+srv://khoiskyioleksandr:parol123@cluster0.jau9bh0.mongodb.net/node-block';
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
