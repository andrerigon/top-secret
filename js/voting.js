module.exports = {

create: 	function (db, options) {  
  return new Voting(db,options);  
}

}

function Voting(db, options){
	this.db = db;
	this.options = options;
}

Voting.prototype.end_in_days = function (days){
	this.db.set("end",end_vote_in_days(days));
}

Voting.prototype.reset = function(){
	for (var i in this.options){
		this.db.set(key_name(this.options[i]),"0");
	}
}

Voting.prototype.percentage_by_vote = function (opt, callback){
	var voting = this;
	this.db.mget( this.options.map(key_name), function(err, values){
		var total = sum(values);

		voting.votes_for(opt, function(number_of_votes){
			var perc = calculate_percentage( number_of_votes, total );
			callback(perc);
		});
		
	} );
}

Voting.prototype.vote = function( opt ){
	this.db.incr(key_name( opt ));
}

Voting.prototype.votes_for = function( opt, callback ){

	this.db.get(key_name(opt), function (err, v) {
    	callback(v);
    });
}

Voting.prototype.time_left = function( callback  ){
	this.db.get('end', function (err, end) {
    	
    	var end = new Date(parseInt(end) );
    	
    	var interval = end.getTime() - new Date().getTime();

		var time = format(interval); 
				
		callback( time );
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

function key_name(opt){
	return 'vote' + opt;
}

function calculate_percentage(portion, total){
	return (portion*100/total).toFixed(2);
}

function end_vote_in_days(days){
	return new Date(new Date().getTime() + daysToMillis(days) ).getTime();
}

function daysToMillis(days){
	return days*24*60*60*1000;
}


function toInt(i){
	return parseInt(i,10);
}

function sum(array){
	return array.map(toInt).reduce(function(a,b){return a+b;});
}