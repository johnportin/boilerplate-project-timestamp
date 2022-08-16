// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { application } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/', (req, res) => {
  const time = new Date();
  res.json(timeToJson(time));
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", (req, res) => {
    let time = new Date(req.params.date);
    if (time == "Invalid Date") {
      time = new Date(parseInt(req.params.date));
    }
    if (time == "Invalid Date") {
      console.log("Found an invalid date", time);
      res.json({ error: "Invalid Date" });
    }
    else {
      res.json(timeToJson(time));
    }
    console.log(req.params.date, time);
});

function timeToJson(time) {
  const date = time.toUTCString();
  const unix = time.getTime();
  return { unix: unix, utc: date };
}





// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
