var app = require('../../app')
  , request = require('../support/http')
  , should = require('should');

describe('Posts', function(){
  describe('POST /posts', function(){
    it('should create a simple post', function(done){
      request(app)
      .post('/posts')
      .send({title:'a', body: 'b', author: 'c', garbage: 'd', id: -3, created_at: null, updated_at: null})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body[0].id.should.be.above(0);
        res.body[0].title.should.equal('a');
        res.body[0].body.should.equal('b');
        res.body[0].author.should.equal('c');
        res.body[0].created_at.should.not.be.empty;
        res.body[0].updated_at.should.not.be.empty;
        done();
      });
    });
  });
});
