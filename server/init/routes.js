var posts = require('../routes/posts');

exports.initialize = function(app){
  app.get('/posts', posts.index);
  app.post('/posts', posts.create);
};
