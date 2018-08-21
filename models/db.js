const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
    if (err) { throw err; }
    console.log('MongoDB connection successful')
});

require('./user.model');