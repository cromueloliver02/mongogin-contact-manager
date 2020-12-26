const express = require('express');
const dotenv = require('dotenv');
const ConnectDB = require('./config/db');
const path = require('path');

const app = express();

// import config file
dotenv.config({ path: './config/config.env' });

// conect to db
ConnectDB();

// middlewares
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Welcome to MongoGin API'));

// routes
app.use('/api/user', require('./_routes/user'));
app.use('/api/auth', require('./_routes/auth'));
app.use('/api/contacts', require('./_routes/contact'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// set static folder
	app.use(express.static('_client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '_client', 'build', 'index.html'))
	);
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
