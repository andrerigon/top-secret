var express = require('express');

var app = express.createServer();

var renderer = renderer();

config();

app.get('/', function(req, res) {
    res.render('index', {
        layout: false,
        locals: {
            recaptcha_form: renderer.build_captcha()
        }
    });
});

app.get('/reset', function(req, res){
	voting.reset();
	res.end("votes reseted!");
});

app.post('/result', function(req, res) {
	renderer.render( req,res );
});

app.listen(8124);
console.log('>>> Server running at http://127.0.0.1:8124/');

function config(){
	app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static('./webroot/'));
    app.use(app.router);
});

app.set('view engine', 'ejs');

app.set('view options', {
    layout: false
});
}

function renderer(){
	return require('./renderer').create(captcha(), voting());
}

function db(){
	var redis = require("redis");
	return redis.createClient();
}

function captcha(){
	return  require('./captcha').create(false);
}

function voting(){
	voting = require('./voting').create(db(), [1,2]);
	voting.end_in_days(2);
	return voting;
}


