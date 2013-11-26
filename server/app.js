var app = require('express')();

require('./init/db').initialize();
require('./init/pipeline').initialize(app);
require('./init/routes').initialize(app);

require('http').createServer(app).listen(app.get('port'));
