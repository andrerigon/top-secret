var express = require('express');
var app = express.createServer();

var redis = require("redis"),
client = redis.createClient();

var started = new Date();

client.set("end",end_vote_in_days(2));

var vote_options=[1,2];

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static('./webroot/'));
    app.use(app.router);
});

app.set('view engine', 'ejs');

app.set('view options', {
    layout: false
});

app.get('/reset', function(req, res){
	for (i in vote_options){
		console.log('reseting for ' + key(vote_options[i]));
		client.set(key(vote_options[i]),"0");
	}
	res.end("votes reseted!");
});

app.post('/result', function(req, res) {
	var vote = req.body['vote'].replace(/[\n\r\t]/g,'');
	console.log("'" + vote + "'");

	voteFor("vote" + vote, res);	
});

app.listen(8124);

console.log('>>> Server running at http://127.0.0.1:8124/');

function voteFor(opt, res){
	client.incr(opt);
	console.log('incremented ' + opt);
    client.get(opt, function (err, v) {
    	time_left(res, v, perc);
    });

}

function result(res,v, time_left){
	console.log( 'perc: ' + v  );
    console.log("\n\n");
    res.render('result', {
    percentage : v, time_left: time_left
	});
}

function end_vote_in_days(days){
	return new Date(new Date().getTime() + daysToMillis(days) ).getTime();
}

function daysToMillis(days){
	return days*24*60*60*1000;
}

function key(opt){
	return 'vote' + opt;
}

function time_left(res, v, callback){

	client.get('end', function (err, end) {
    	
    	var end = new Date(parseInt(end) );
    	console.log('voting ends at: ' + end);
    	
    	var interval = end.getTime() - new Date().getTime();

		var time = format(interval); 
		
		console.log('voting ends in: '+ time);
		callback( res,v, time, result );
    });
}

function format(ms) {

	var sec = Math.floor(ms/1000);
	ms = ms % 1000;


	var min = Math.floor(sec/60);
	sec = sec % 60;
	t = format_number(sec);

	var hr = Math.floor(min/60);
	min = min % 60;
	t = format_number(min) + ":" + t;

	var day = Math.floor(hr/60);
	hr = hr % 60;
	t = format_number(hr) + ":" + t;

	return t;
}

function format_number(n){
	if(n < 10)
		return '0' + n;
	return n;
}


function perc(res,v,time_left, callback){
	client.mget( vote_options.map(key), function(err, values){
		var total = sum(values);
		console.log('total of votes: ' + total);

		var perc = calculate_percentage( v, total );
		console.log( 'perc: ' + perc);
		callback(res, perc, time_left);
	} );
}

function calculate_percentage(portion, total){
	return (portion*100/total).toFixed(2);
}

function toInt(i){
	return parseInt(i,10);
}

function sum(array){
	return array.map(toInt).reduce(function(a,b){return a+b;});
}

