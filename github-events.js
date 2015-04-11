require('dotenv').load();
var Pusher = require('pusher');
var GitHubApi = require("github");
var prettyjson = require("prettyjson");


var pusher = new Pusher({
  appId:  process.env.PUSHER_APP_ID,
  key:    process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});
var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: false,
    protocol: "https",
    headers: {
        "user-agent": "JSOxford-RTHack" // GitHub is happy with a unique user agent
    }
});
github.authenticate({
    type: "oauth",
    key: process.env.GH_KEY,
    secret: process.env.GH_SECRET
})
var now = new Date();

var getNewEvents = function(){
    github.events.getFromOrg({
        org: "JSOxford"
    }, function(err, res) {
        if(err) {
            console.log(err);
            return;
        }
        var newEvents = [],
            i=0, len=res.length;
        for(i=0;i<len;i++){
            if(new Date(res[i].created_at) > now){
                newEvents.push(res[i]);
            }
        }
        for(i=0,len=newEvents.length;i<len;i++){
            pusher.trigger('github', 'org-event', newEvents[i]);
        }
        now = new Date();
    });
    setTimeout(getNewEvents, 3000);
};
setTimeout(getNewEvents, 3000);