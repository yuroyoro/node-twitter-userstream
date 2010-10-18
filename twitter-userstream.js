var sys = require('sys')
  , http = require("http")
  , OAuth = require('./vender/node-oauth/lib/oauth').OAuth
  , oauth_settgins = require('./oauth_settgins')["config"]
  , ws = require('./vender/node-websocket-server/lib/ws');


var oa= new OAuth("http://twitter.com/oauth/request_token",
                  "http://twitter.com/oauth/access_token",
                  oauth_settgins["consumer_key"],
                  oauth_settgins["consumer_secret"],
                  "1.0", null, "HMAC-SHA1");

var httpServer = http.createServer();

var server = ws.createServer({
  debug: true
}, httpServer);

// Handle WebSocket Requests
server.addListener("connection", function(conn){
  sys.log("opened connection: "+conn.id);
  server.send(conn.id, "Connected as: "+conn.id);

  var buf = "";
  oa.getProtectedResource("https://userstream.twitter.com/2/user.json", "GET",
     oauth_settgins["access_token"],
     oauth_settgins["access_token_secret"],
     function( error, data, response) {sys.log(data) },
     function( chunk ){
       if (chunk.match(/\n/)) {
         var chunks = chunk.split(/\r?\n/);
         buf = buf + chunks.pop();
         while( msg = chunks.shift() ){
           sys.log( msg );
           server.send(conn.id, msg );
         }
         return;
       }
       buf += chunk;
  });
  server.send(conn.id, "Connected as: "+conn.id);
});

server.addListener("close", function(conn){
  sys.log("closed connection: "+conn.id);
  conn.broadcast("<"+conn.id+"> disconnected");
});

server.listen(8000);
