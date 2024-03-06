const mongoose = require('mongoose');

const connectDB = async () => {
	// production script
	const conn = await mongoose.connect(process.env.MONGO_URI_DEPLOY);
	//dev script
	// const conn = await mongoose.connect(process.env.MONGO_URI);
	console.log(`Mongo DB connected, ${conn.connection.host}`);
};

module.exports = connectDB;
