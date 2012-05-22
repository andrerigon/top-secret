

module.exports = {

create: 	function (captcha, voting) {  
  return new Renderer(captcha, voting);  
}

}

function Renderer( captcha, voting ){
	this.captcha = captcha;
	this.voting = voting;
}

Renderer.prototype.build_captcha = function(){
	return this.captcha.recaptcha();
}

Renderer.prototype.result = function(req, res){

	var vote = req.body['vote'].replace(/[\n\r\t]/g,'');

	this.voteFor(vote, res);	
};

Renderer.prototype.render = function(req, res){
	var render = this;
	this.captcha.verify_captcha(req, res, function(){ render.result( req, res ) });
}

Renderer.prototype.voteFor = function(vote, res){

	var render = this;

	this.voting.vote(vote);
	
    this.voting.percentage_by_vote( vote, function( v ){
    	render.perc(v, vote, res);
    } )

};


Renderer.prototype.time_left = function(callback){

	this.voting.time_left( function(v){
		callback(v);
	} );
};

Renderer.prototype.perc = function(perc, vote, res){
		    
    this.time_left(function(v){ 
    	data = {
    		vote: vote,
    		percentage: perc,
    		time_left: v
    	};
    	console.log(data);
    	console.log("\n");
    	res.render('result',data) 
    });
};

