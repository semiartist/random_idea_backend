const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

//establish DB connection
connectDB();

const app = express();

// boey parser middle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('hello world');
});

const ideasRouter = require('./routes/ideas');
const { connect } = require('mongoose');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(port));
