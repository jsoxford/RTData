require('dotenv').load();

var Pusher = require('pusher');
var tweets = require('tweets');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

var stream = new tweets({
  consumer_key:          process.env.TW_GEO_KEY,
  consumer_secret:       process.env.TW_GEO_SECRET,
  access_token:          process.env.TW_GEO_TOKEN,
  access_token_secret:   process.env.TW_GEO_TOKEN_SECRET
});


// San Francisco
// stream.filter({locations:'-122.75,36.8,-121.75,37.8'});

// UK
// stream.filter({locations:'-11.733398,49.553726,2.944336,60.543775'});

// Oxfordshire -2.235718, 51.186230, -0.686646, 52.099757
stream.filter({locations:'-2.235718,51.186230,-0.686646,52.099757'});

stream.on('tweet', function(t){
  pusher.trigger('twitter-geo', 'tweet', t);
});

stream.on('reconnect', function(reconnect){
  console.log('reconnected', reconnect);
});
