var Post = require('../models/post');

exports.index = function(req, res){
};

exports.create = function(req, res){
  var post = new Post(req.body);
  post.save(function(err, post){
    res.send(err || post);
  });
};
