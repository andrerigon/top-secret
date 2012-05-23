require('should')

var redis = require("redis");
    
var v = require('../js/voting').create(redis.createClient(), [1,2,3]);
 

describe('Voting', function(){

  describe('#test Voting', function(){
  	

    it('should reset votes', function(done){
        
        v.vote(3);v.vote(2);v.vote(1);

        v.reset();

        v.votes_for(3, function(value){
            value.should.equal('0');
            done();
        });
    })

    it('should inc vote for option 3', function(done){
        v.reset();

    	v.vote(3);

        v.votes_for(3, function(value){
            value.should.equal('1');
            done();
        });
    })

    it('should return correct percentage', function(done){
        v.reset();
        
        v.vote(3);
        v.vote(3);
        v.vote(3);
        v.vote(3);

        v.vote(2);
        v.vote(2);

        v.vote(1);
        v.vote(1); 

        v.percentage_by_vote(1, function(value){
            value.should.equal( '25.00' );
            done();
        });
    })
  })
})
