const express = require('express');
const app = express();

// app.use(express.static('public'));

app.get('/get-ip', (req, res) => {
  // Get client IP
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Client IP:', ip);
  res.json({ ip });
});

app.get('/home', (req, res, next) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});

const axios = require('axios');

app.get('/check-location', async (req, res) => {
  // Get IP from headers or socket
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // For localhost testing, replace loopback with your real IP
  if (ip === '::1' || ip === '127.0.0.1') {
    ip = '8.8.8.8'; // Example: Google’s public DNS IP for testing
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

module.exports = app;