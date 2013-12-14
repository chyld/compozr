var db = require('../lib/db');

exports.initialize = function(){
  db.on('pool-ready', function(){db.cacheSchema();});
  db.createPool('pg://compozr:node@localhost/compozr', 10);
};
