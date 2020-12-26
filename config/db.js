const mongoose = require('mongoose');

const ConnectDB = async () => {
	try {
		const mongoURI =
			process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mongogin';

		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		console.log(`MongoDB successfully connected on ${mongoURI}`);
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = ConnectDB;
