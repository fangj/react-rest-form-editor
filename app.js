var express = require('express');
var app = express();
var nedb=require('nedb');
var expressRestResource = require('express-rest-resource');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('dist'));

var postDb = new nedb({ filename: 'postDb', autoload: true });
app.use('/api/post', expressRestResource({ db: postDb }));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});