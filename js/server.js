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

app.get('/reset', function(req, res){
	for (i in vote_options){
		console.log('reseting for ' + key(vote_options[i]));
		client.set(key(vote_options[i]),"0");
	}
	res.end("votes reseted!");
});

app.set('view options', {
    layout: false
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
    	time_left(res, v, result);
    });

}

function result(res,v, time_left){
	console.log( 'value: ' + v  );
    console.log("\n\n");
    res.render('result', {
    percentage : perc(v), time_left: time_left
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

function time_left(res, v, f){

	client.get('end', function (err, end) {
    	
    	var end = new Date(parseInt(end) );
    	console.log('voting ends at: ' + end);
    	
    	var interval = end.getTime() - new Date().getTime();

		var time = format(interval); 
		
		console.log('voting ends in: '+ time);
		f( res,v, time );
    });

	
}

function format_number(n){
	if(n < 10)
		return '0' + n.toFixed(0);
	return n.toFixed(0);
}

function format(interval){
	var seconds = format_number((interval/1000)%60);
	var minutes = format_number((interval/(1000*60))%60);
	var hours   = format_number(interval/(1000*60*60));
	return '' + hours + ':' + minutes + ':' + seconds;
}

function perc(v){
	
	//return (100*v)/(v+0);
	return 21.5;
}