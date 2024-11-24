// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  let result = {};

  // If no date parameter is provided, return the current date/time
  if (!date) {
    const now = new Date();
    result.unix = now.getTime();
    result.utc = now.toUTCString();
    return res.json(result);
  }

  // If the date parameter is a valid Unix timestamp (number)
  let parsedDate;
  if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    // Try parsing the date string
    parsedDate = new Date(date);
  }

  // If the parsed date is invalid, return error
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the parsed date in Unix timestamp and UTC string format
  result.unix = parsedDate.getTime();
  result.utc = parsedDate.toUTCString();
  res.json(result);
});

// Your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
