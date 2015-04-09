require('dotenv').load();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

var count = 0;

setInterval(function(){
  var now = new Date;
  pusher.trigger('time', 'tick', {
    formatted: now.toTimeString(),
    timestamp: +now,
    seconds:   now.getSeconds(),
    count:     count++
  });
}, 10000);
