var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// Setup Express
var app = express()

// Setup & Connect to Database
var database = require('./config/database')
mongoose.connect(database.url)

// Setup View Engine 
app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'hjs')

// Setup Favicon
//app.use(favicon(__dirname + '/public/favicon.ico'))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routing
require('./routes')(app)

// Export app
module.exports = app