var util = require('util');
var Model = require('../lib/model');

var Post = function(data){
  Model.call(this, 'posts', data);
};

util.inherits(Post, Model);
module.exports = Post;
