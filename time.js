require('dotenv').load();

var Pusher = require('pusher');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});


setInterval(function(){
  pusher.trigger('example', 'time', {
    data: Date.now()
  });
}, 1000);
