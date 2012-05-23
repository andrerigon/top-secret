var Recaptcha = require('recaptcha').Recaptcha;

var PUBLIC_KEY  = '6LfoutESAAAAAFS15hESb-tDPQBrFcTPvsgWYIts',
    PRIVATE_KEY = '6LfoutESAAAAAHO7yQyyPcHMi3G8lcpR9UA5xIuZ';

module.exports = {

create: 	function (active) {  
  return new Captcha(active);  
}

}

function Captcha(active){
	this.active = active;
}

Captcha.prototype.recaptcha = function ( ){
	var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY);
	return recaptcha.toHTML();
};

Captcha.prototype.verify_captcha = function (req, res, success_cb, error){
	if(!this.active){
		success_cb();
		return;
	} 
	
    var recaptcha = new Recaptcha(PUBLIC_KEY, PRIVATE_KEY, data_from(req));
    recaptcha.verify(function(success, error_code) {
        if (success) {
            success_cb();
        }
        else {
        	error();
        }
    });
};

function data_from(req){
	var data = {
        remoteip:  req.connection.remoteAddress,
        challenge: req.body.recaptcha_challenge_field,
        response:  req.body.recaptcha_response_field
    };
    return data;
}