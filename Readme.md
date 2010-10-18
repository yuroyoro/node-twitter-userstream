example of node.js with twitter usersteream api
====================================================

node.jsでwebsocketしつつ、twitter usersteream apiでとってきたjsonを垂れ流すサンプル

http://twitter.com/yuroyoro

いるもの:
--------------------

* Node.js.
* HTML5 WebSocket が使えるbrowser(Google chromeとか).
* node-oauth(http://github.com/ciaranj/node-oauth) にstreaming用のpatchを当てたもの
* node-websocket-server(http://github.com/miksago/node-websocket-server )

How to:
---------------------
* node.jsを入れておいてね (http://nodejs.org/#download).
* このプロジェクトをcloneしてね
* oauth_settgins_sample.jsをoauth_settgins.jsにrenameして、consumer keyやconsumer secretやaccess tokenやaccess token secretを書き換えてね。consumer keyとかはhttp://dev.twitter.com/ でとってね
* node-oauthにパッチ当ててね。node-oauth/lib/oauth.jsに、vender/node-oauth/steraming.patchを当てて書き換えて
* node twitter-userstream.js でサーバーが起動するお
* websocket使えるブラウザでindex.html開いて、startボタン押してね

