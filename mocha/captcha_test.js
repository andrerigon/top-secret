var c = require('../js/captcha')

describe('Captcha', function(){
  describe('#test captcha', function(){
  	

    it('should call callback without validating', function(){
    	var captcha = c.create(false);
      	captcha.verify_captcha( {}, {}, function(){ })
    })

    it('should validate captcha', function(){
    	var captcha = c.create(true);

    	var connection = {
    		remoteAddress: '127.0.0.1'
    	}
    	var body = {
    		recaptcha_challenge_field: '123',
        	recaptcha_response_field: '1233089'
    	}
    	var req = {
    		connection: connection,
        	body: body
    	}

    	captcha.verify_captcha( req, {}, function(){}, function(){})
    } )
  })
})
