require('dotenv').load();
var spark = require('spark');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

spark.on('login', function() {
  spark.getEventStream('Temp', process.env.SPARK, function(data) {
    var temp = JSON.parse(data.data);
    var time = data.published_at;
    console.log('Temp: ' + temp.temperature);
    console.log('Humidity: ' + temp.humidity);
    pusher.trigger('temp', 'temp', { temperature: temp.temperature, timestamp: time });
    pusher.trigger('temp', 'humidity', { humidity: temp.humidity, timestamp: time });
    pusher.trigger('temp', 'all', { humidity: temp.humidity, temperature: temp.temperature, timestamp: time });
  });
});

spark.login({ accessToken: process.env.SPARK_TOKEN });
