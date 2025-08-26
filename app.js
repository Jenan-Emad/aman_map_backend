const express = require('express');
const app = express();

app.get('/home', (req, res, next) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});

module.exports = app;