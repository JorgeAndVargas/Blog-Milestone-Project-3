require('dotenv').config();

const express = require('express');
const expresslayout = require('express-ejs-layouts');

const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.static('public'));

app.use(expresslayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'))

app.listen(PORT, () => {
    console.log("Server is running!");
});