require('dotenv').load();

var Pusher = require('pusher');
var Stream = require('user-stream');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

var stream = new Stream({
  consumer_key:          process.env.TW_USER_KEY,
  consumer_secret:       process.env.TW_USER_SECRET,
  access_token_key:      process.env.TW_USER_TOKEN,
  access_token_secret:   process.env.TW_USER_TOKEN_SECRET
});

//create stream
stream.stream();

//listen stream data
stream.on('data', function(data) {
  console.log(">>>", data)

  pusher.trigger('twitter-user', 'data', data);

  // particular user non-tweet events
  // https://dev.twitter.com/streaming/overview/messages-types#Events_event
  if(data.event)
    pusher.trigger('twitter-user', data.event, data);

})
.on('error', function(e) {
  console.error(e);
});