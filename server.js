const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

//establish DB connection
connectDB();

const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

// boey parser middle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middle ware
app.use(
	cors({
		origin: [
			'http://localhost:5000',
			'http://localhost:3000',
			process.env.ENDPOINT,
		],
		credentials: true,
	}),
);

app.get('/', (req, res) => {
	res.send('hello world');
});

const ideasRouter = require('./routes/ideas');
const { connect } = require('mongoose');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(port));
