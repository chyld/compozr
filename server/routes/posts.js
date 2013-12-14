var Post = require('../models/post');

exports.index = function(req, res){
  var post = new Post();
  post.find(null, function(err, posts){
    res.send(err || posts);
  });
};

exports.create = function(req, res){

console.log('-----routes-----');
console.log('-----routes-----');
console.log('-----routes-----');


  var post = new Post(req.body);
  post.save(function(err, post){
    res.send(err || post);
  });
};
