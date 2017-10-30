var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var multer = require('multer');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var tweets = []

//var server = app.listen(8080, "192.168.1.111", function () {
//var server = app.listen(8181, "172.31.40.211", function () {
// AWS http://localhost:8181/
var server = app.listen(8181, "0.0.0.0", function () {
//var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('iot server listening at http://%s:%s', host, port);
});

app.get('/', function(req, res) {
  res.send('Welcome to Node Twitter')
})

app.post('/send', urlencodedParser, jsonParser, function (req, res) {
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet)
    res.send({status:"ok", message:"Tweet received"})
  } else {
    res.send({status:"nok", message:"No tweet received"})
  }
});

app.get('/tweets', function(req, res) {
  res.send(tweets)
})

// app.use(express.static('public'));

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// //app.use(multer()); // for parsing multipart/form-data

// // curl http://localhost:8181/status?username=zhangtao&password=abc
// app.get('/status', function (req, res) {
//     console.log(req.query);
//     res.send('status, ' + req.query.username + '\n');
// });

// // AWS IP: 35.167.137.118

// // curl -s -X POST -d "username=zhangtao&password=abc" http://localhost:8181/callback
// // curl -s -H "Content-Type: application/json" -X POST -d '{"username":"zhangtao", "password":"abc"}' http://localhost:8181/callback
// app.post('/callback', function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   res.json(req.body);
// });

// // curl -s -X POST -d "username=zhangtao&password=abc" http://localhost:8181/command
// app.post('/command', function (req, res) {
//   if (!req.body) return res.sendStatus(400);
//   // 检查浏览器POST里的Accept:
//   console.log("type = " + req.accepts(['text/html', 'application/json']));
//   console.log(req.body);
//   res.send('command, ' + req.body.username + '\n');

//   // 也可以重定向到别的页面处理
//   //res.redirect(303, '/thank-you');
// });

// // http://localhost:3000/user/123
// app.get('/user/:id', function (req, res, next) {
//   res.send('USER ' + req.params.id);	// 输出USER 123
// });

// app.use(function(req, res, next) {
//   res.status(404).send('404 - Not Found');
// });

// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('500 - Server Error');
// });


