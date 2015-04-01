require('dotenv').load();

var replaceStream = require('replacestream');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  fs.createReadStream(path.join(__dirname, 'public/index.html'))
    .pipe(replaceStream('<<PUSHER_KEY>>', process.env.PUSHER_KEY))
    .pipe(res);
});

app.use(express.static('public'));

app.listen(3000);