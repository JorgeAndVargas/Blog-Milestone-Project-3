require('dotenv').config();

const express = require('express');
const expresslayout = require('express-ejs-layouts');

const connectDB = require('./server/config/database');

const app = express();
const PORT = 3001 || process.env.PORT;

// Connect to the Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(expresslayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));


app.listen(PORT, () => {
    console.log("Server is running!");
});