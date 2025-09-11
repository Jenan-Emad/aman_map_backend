const express = require('express');
const axios = require('axios');

// استدعاء الراوتس
const mapRoutes = require('./routes');
const hazardRoutes = require('./routes/hazardRoutes');

const app = express();

// middleware
app.use(express.json()); 
app.use(express.static('public'));

//  Routes
// test: get user ip
app.get('/get-ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Client IP:', ip);
  res.json({ ip });
});

// test: home page
app.get('/home', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
});

// test: get user device location
app.get('/check-location', async (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // For localhost testing
  if (ip === '::1' || ip === '127.0.0.1') {
    ip = '8.8.8.8'; // Example IP for testing
  }

  try {
    const response = await axios.get(`https://ipinfo.io/${ip}/json`);
    console.log(response.data);
    res.json({ location: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking location");
  }
});

// map routes
app.use('/map', mapRoutes);

// hazard routes
app.use('/api/hazards', hazardRoutes);

module.exports = app;
