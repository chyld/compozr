var app = module.exports = require('express')();

require('./init/db').initialize();

global.db.on('schema-ready', function(){
  console.log('-----------listening------------------');
  console.log('-----------listening------------------');
  console.log('-----------listening------------------');
  require('./init/pipeline').initialize(app);
  require('./init/routes').initialize(app);
  require('http').createServer(app).listen(app.get('port'));
});
