require('dotenv').load();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

setInterval(function(){
  var now = new Date;
  pusher.trigger('time', 'tick', {
    timestamp: +now,
    formatted: now.toTimeString(),
    seconds:   now.getSeconds()
  });
}, 15000);
