const express = require('express');
const mapRoutes = require('./routes');
const { WebServiceClient } = require('@maxmind/geoip2-node');

const app = express();

app.use(express.static('public'));

//test of how to get user ip address
app.get('/get-ip', (req, res) => {
  // Get client IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Client IP:', ip);
  res.json({ ip });
});

app.get('/home', (req, res, next) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});


app.use('/map', mapRoutes); 

module.exports = app;