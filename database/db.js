const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });

        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectToDB;
