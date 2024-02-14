var path = require('path');
var express = require('express');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv').config();
var cors = require('cors');

var app = express();
var corsOptions = {
  origin: 'https://aha-backend.fly.dev',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieparser(path.join(__dirname, '/dist')));
app.set('port', process.env.PORT || 8080);
app.use(cors(corsOptions));

var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
